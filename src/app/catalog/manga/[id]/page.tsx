// app/manga/[id]/page.tsx
import { Suspense } from "react";


import MangaInfo from "@/app/components/mangaInfo";
import LoadingSkeleton from "@/app/components/mangaInfoSkeleton";


export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {

  
  return (
    <main className="w-full flex justify-center p-12 min-h-[88vh]">
      <Suspense fallback={<LoadingSkeleton />}>
        <MangaInfo params={params} />
      </Suspense>
    </main>
  );
}
