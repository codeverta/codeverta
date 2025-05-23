import Head from "next/head";
import { getPostsByTag } from "@/lib/blog-service";
import { BlogCard } from "@/components/blog-card";
import { BlogPost } from "types/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TagPageProps {
  posts: BlogPost[];
  tag: string;
}

export default function TagPage({ posts, tag }: TagPageProps) {
  return (
    <>
      <Head>
        <title>Posts tagged with "{tag}"</title>
        <meta name="description" content={`All posts tagged with ${tag}`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Posts tagged with "{tag}"</h1>

        {posts.length === 0 ? (
          <p className="text-lg text-muted-foreground">
            No posts found with this tag.
          </p>
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

export const getServerSideProps = async ({ params }) => {
  const tag = params?.tag as string;

  if (!tag) {
    return {
      notFound: true,
    };
  }

  try {
    const posts = await getPostsByTag(decodeURIComponent(tag));

    const serializedPosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return {
      props: {
        posts: serializedPosts.map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        })),
        tag: decodeURIComponent(tag),
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
        tag: decodeURIComponent(tag),
      },
    };
  }
};
