import { GetServerSideProps } from "next";
import Head from "next/head";
import { BlogForm } from "@/components/blog-form";
import { updatePost, getPostById } from "@/lib/blog-service";
import { CreateBlogPost, BlogPost } from "@/types/blog";
import { useRouter } from "next/router";

interface EditPostPageProps {
  post: BlogPost | null;
}

export default function EditPostPage({ post }: EditPostPageProps) {
  const router = useRouter();

  if (!post) {
    return (
      <>
        <Head>
          <title>Post Not Found</title>
        </Head>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
        </div>
      </>
    );
  }

  const handleSubmit = async (data: CreateBlogPost) => {
    try {
      await updatePost(post.id, data);
      router.push("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const initialData: CreateBlogPost = {
    title: post.title,
    description: post.description,
    content: post.content,
    tags: post.tags,
    imageUrl: post.imageUrl,
    published: post.published,
  };

  return (
    <>
      <Head>
        <title>Edit Post - {post.title}</title>
      </Head>

      <BlogForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Post"
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const post = await getPostById(id);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: {
          ...post,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      notFound: true,
    };
  }
};
