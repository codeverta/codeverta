import Head from "next/head";
import { getAllPosts } from "@/lib/blog-service";
import { BlogCard } from "@/components/blog-card";
import { BlogPost } from "types/blog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HomePageProps {
  posts: BlogPost[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta
          name="description"
          content="A modern blog built with Next.js and Firebase"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Blog</h1>
          <Link href="/admin/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No posts yet.</p>
            <Link href="/admin/create">
              <Button className="mt-4">Create your first post</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const posts = await getAllPosts();

    // Serialize dates for JSON
    const serializedPosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return {
      props: {
        posts: serializedPosts, // ✅ Keep as ISO strings
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};
