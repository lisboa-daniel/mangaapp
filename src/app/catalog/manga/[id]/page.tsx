'use client';

import { useManga } from "@/app/context/mangaContext";
import { GetMangaById } from "@/app/lib/actions";
import { Box, Button, Skeleton } from "@mui/material";
import { useEffect, useState, use, Suspense } from "react";

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


function DynamicContent({ params }: PageProps) {
  
    const { id } = use(params)
    const [manga, setManga] = useState<Manga | undefined>(undefined);

    const [error, setError] = useState<string>('');

    useEffect(() => {
      const fetchMangas = async () => {
        try {
          const data = await GetMangaById(id); // returns Manga[]
          if (data)
            setManga(data);
        } catch (err : any){
          setError(`Could not fetch data: ${err}`)
        }
       
      };
  
      fetchMangas();
    }, []);


    return (
      <div id="mangaInfo">
          {(manga) && <MangaItem data={manga}/>}
          {(manga==undefined && error != "") && <p>Could not find this title, please try looking at <a href="/catalog">Catalog</a> </p>}
      </div>
    );
}

export default function Page({ params }: PageProps) {
 

    return (
    <main className="w-full flex justify-center p-12 min-h-[88vh]">
        <p>Loading ... </p>
        <Suspense fallback={<Skeleton />}>
          <DynamicContent  params={params}/>
        </Suspense>
    </main>
    );
}
