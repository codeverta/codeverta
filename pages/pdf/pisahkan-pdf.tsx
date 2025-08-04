// app/page.tsx
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the splitter component with SSR turned off
const PdfSplitter = dynamic(() => import("@/components/PdfSplitter"), {
  ssr: false,
  loading: () => (
    // Show a loading skeleton while the component loads
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="text-center mb-8">
        <Skeleton className="h-10 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto mt-4" />
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-60 w-full" />
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <PdfSplitter />
    </main>
  );
}
