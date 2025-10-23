'use client';

import { useManga } from "@/app/context/mangaContext";
import { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: PageProps) {
    const { id } = use(params)
    const numericId = Number(id);

    const { mangas } = useManga();
    const [item, setItem] = useState<Manga>();

    useEffect(() => {
    const manga = mangas.find(m => m.id === numericId);
    if (manga) {
        setItem(manga);
    } 
    }, [numericId]);

    return (
    <main className="w-full flex justify-center p-12 min-h-[88vh]">
        <div id="form">
        <p>{item?.title}</p>
        </div>
    </main>
    );
}
