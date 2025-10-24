// app/manga/[id]/page.tsx
import { Suspense } from "react";


import MangaInfo, { redirectTo } from "@/app/components/mangaInfo";
import LoadingSkeleton from "@/app/components/mangaInfoSkeleton";
import { Button } from "@mui/material";
import NormalButton from "@/app/components/normalButton";


export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {

  const {id} = await params;

  return (
    <main className="w-full flex flex-col justify-center p-12 min-h-[88vh]">
      <Suspense fallback={<LoadingSkeleton />}>
        <MangaInfo params={params} />
      </Suspense>

      

      <span className="flex flex-row gap-2 mt-5 w-full items-center justify-center"> 
          <a href={`/catalog/manga/new?edit=${id}`}><Button variant="outlined">Edit Entry</Button></a>

      </span>
    </main>
  );
}
