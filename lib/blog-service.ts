import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { BlogPost, CreateBlogPost } from 'types/blog';

const COLLECTION_NAME = 'blog-posts';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to extract storage path from Firebase URL
function getStoragePathFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+?)\?/);
    return pathMatch ? decodeURIComponent(pathMatch[1]) : null;
  } catch (error) {
    console.error('Error parsing storage URL:', error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('slug', '==', slug),
    where('published', '==', true)
  );
  
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  
  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  } as BlogPost;
}

export async function createPost(post: CreateBlogPost): Promise<string> {
  const slug = generateSlug(post.title);
  const now = Timestamp.now();
  
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...post,
    slug,
    createdAt: now,
    updatedAt: now,
  });
  
  return docRef.id;
}

export async function updatePost(id: string, post: Partial<CreateBlogPost>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const updateData: any = {
    ...post,
    updatedAt: Timestamp.now(),
  };
  
  if (post.title) {
    updateData.slug = generateSlug(post.title);
  }
  
  await updateDoc(docRef, updateData);
}

export async function deletePost(id: string): Promise<void> {
  // Get the post first to delete associated image
  const post = await getPostById(id);
  if (post && post.imageUrl) {
    try {
      await deleteImageFromStorage(post.imageUrl);
    } catch (error) {
      console.error('Error deleting associated image:', error);
      // Continue with post deletion even if image deletion fails
    }
  }
  
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
  try {
    const storagePath = getStoragePathFromUrl(imageUrl);
    if (!storagePath) {
      throw new Error('Invalid storage URL' + JSON.stringify(imageUrl));
    }
    
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image from storage:', error);
    throw error;
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('tags', 'array-contains', tag),
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as BlogPost[];
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;
  
  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt.toDate(),
    updatedAt: docSnap.data().updatedAt.toDate(),
  } as BlogPost;
}