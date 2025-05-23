import { GetServerSideProps } from "next";
import Head from "next/head";
import { getPostBySlug } from "@/lib/blog-service";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  post: BlogPost | null;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return (
      <>
        <Head>
          <title>Post Not Found</title>
        </Head>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <Link href="/">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article>
          <header className="mb-8">
            {post.imageUrl && (
              <div className="relative w-full h-64 md:h-96 mb-6">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <p className="text-xl text-muted-foreground mb-4">
              {post.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Published {format(post.createdAt, "MMMM dd, yyyy")}</span>
                {post.updatedAt > post.createdAt && (
                  <span>Updated {format(post.updatedAt, "MMMM dd, yyyy")}</span>
                )}
              </div>

              <Link href={`/admin/edit/${post.id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    const post = await getPostBySlug(slug);

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
