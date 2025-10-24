'use client';

import { useManga } from "@/app/context/mangaContext";
import { Box, Button } from "@mui/material";
import { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}


interface InfoPanel {
  label : string,
  value : String
}

function MangaItem({data} : {data:Manga | undefined}){

  const infoList : InfoPanel[] = [
    {
      label: "Author",
      value : (data?.author) ? data.author : ""
    },
    {
      label: "Status",
      value : (data?.status) ? data.status : ""
    },
    {
      label: "Demographic",
      value : (data?.demographic) ? data.demographic : ""
    },
    {
      label: "ISBN",
      value : (data?.ISBN) ? data.ISBN : ""
    },
  ];

  return (
        <div className='flex flex-col p-2 items-center justify-center'>
                  <p className='w-full text-center title mb-2'>{data?.title}</p>
                  <div id='mangapanel' className='flex gap-3 items-center justify-center' >
                    
                    <div  className="flex gap-2 md:flex-row flex-col " >                    
                      <img className='rounded float-left w-[280px]' src={data?.picture}  />

                      <p  className='text-justify mt-2 max-w-[320px]'>{data?.synopsis}</p>
                      
                    </div>
                   


                  </div>
                  <div id='infodump' className="flex flex-col w-full items-start mt-2 gap-2">
                    
                    {
                      infoList.map( (value, index) => (
                          <span key={index} className="flex flex-row gap-2">
                            <p className="font-bold">{value.label}:</p>
                            <p>{value.value}</p>
                          </span>
                      ))
                    }

                          
                    
                  </div>

                  <span className="flex flex-row gap-2 items-start w-full mt-2">
                    {data?.tags.map( (value, index) => (
                      <p className="p-2 font-bold bg-primary-900 text-white" key={index}>{value}</p>
                    ))}
                  </span>

                  <span className="flex flex-row gap-2 mt-5">
                      <Button onClick={() => { window.location.href=`/catalog/manga/new?edit=${data?.id}`}} variant="outlined">Edit Entry</Button>
                  </span>
                     
                  
              </div>
  );
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


        <MangaItem data={item}/>
        </div>
    </main>
    );
}
