// app/components/MangaInfo.tsx
import { Button } from "@mui/material";
import { GetMangaById } from "../lib/actions";


interface InfoPanel {
  label: string;
  value: string;
}


interface PageProps { params: Promise<{ id: string; }>; }


import { redirect } from "next/navigation";
import { use } from "react";

export async function redirectTo(uri: string) {
  redirect(uri);
}

async function MangaItem({ data }: { data: Manga }) {
  const infoList: InfoPanel[] = [
    { label: "Author", value: data.author ?? "" },
    { label: "Status", value: data.status ?? "" },
    { label: "Demographic", value: data.demographic ?? "" },
    { label: "ISBN", value: data.ISBN ?? "" },
  ];

  return (
    <div className="flex flex-col p-2 items-center justify-center">
      <p className="w-full text-center title mb-2">{data.title}</p>

      <div id="mangapanel" className="flex gap-3 items-center justify-center">
        <div className="flex gap-2 md:flex-row flex-col">
          <img className="rounded w-[280px]" src={data.picture} alt={data.title} />
          <p className="text-justify mt-2 max-w-[320px]">{data.synopsis}</p>
        </div>
      </div>

      <div id="infodump" className="flex flex-col w-full items-start mt-2 gap-2">
        {infoList.map((item, i) => (
          <span key={i} className="flex flex-row gap-2">
            <p className="font-bold">{item.label}:</p>
            <p>{item.value}</p>
          </span>
        ))}
      </div>

      <span className="flex flex-row gap-2 items-start w-full mt-2">
        {data.tags.map((tag, i) => (
          <p className="p-2 font-bold bg-primary-900 text-white" key={i}>
            {tag}
          </p>
        ))}
      </span>

      {/* <span className="flex flex-row gap-2 mt-5"> <Button onClick={() => redirectTo(`/catalog/manga/new?edit=${data.id}`)} variant="outlined">Edit Entry</Button> </span> */}
    </div>
  );
}
export default async function MangaInfo({ params }: { params: { id: string } }) { 
  
const { id } = await params;

    try {
    const data = await GetMangaById(id);

    if (!data) {
        return (
        <p>
            Could not find this title, please try looking at{" "}
            <a href="/catalog" className="text-blue-600 underline">
            Catalog
            </a>
        </p>
        );
    }

    return (
        <div id="mangaInfo">
        <MangaItem data={data} />
        </div>
    );
    } catch (err) {
    console.error(err);
    return (
        <p>
        Could not fetch data. Please try looking at{" "}
        <a href="/catalog" className="text-blue-600 underline">
            Catalog
        </a>
        .
        </p>
    );
    }
}
