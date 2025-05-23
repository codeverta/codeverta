import Head from "next/head";
import { BlogForm } from "@/components/blog-form";
import { createPost } from "@/lib/blog-service";
import { CreateBlogPost } from "@/types/blog";
import { useRouter } from "next/router";

export default function CreatePostPage() {
  const router = useRouter();

  const handleSubmit = async (data: CreateBlogPost) => {
    try {
      await createPost(data);
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Post</title>
      </Head>

      <BlogForm onSubmit={handleSubmit} submitLabel="Create Post" />
    </>
  );
}
