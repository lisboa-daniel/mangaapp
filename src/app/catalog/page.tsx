'use client';

import { Button, Divider, TextField } from "@mui/material";
import { useManga } from "../context/mangaContext";
import MangaListView from "../components/mangaListView";
import { useEffect, useState } from "react";
import { GetAllManga } from "../lib/actions";


export default function List() {

  const [manga, setManga] = useState<Manga[]>([]);

  useEffect(() => {
    const fetchMangas = async () => {
      const data = await GetAllManga(); // returns Manga[]
      setManga(data);
    };

    fetchMangas();
  }, []);


    return (
      <main className="w-full flex flex-col  p-12 min-h-[88vh]">
        <p className="title text-2xl mb-2"> Manga Catalog </p>
        
        <Divider className="w-full mt-2 mb-2" flexItem orientation="horizontal"/>


        <div className="flex flex-row p-2 items-center justify-start mb-2 gap-2">
          <p>Search</p> 
          
          <TextField className="text-sm"
          
          sx={{
            "& .MuiOutlinedInput-input": {
              height: '17px', // Adjust as needed
              paddingTop: '8px', // Adjust padding for vertical alignment
              paddingBottom: '8px',
            },
          }}
          />

          <Button onClick={() => {window.location.href = '/catalog/manga/new'}} variant="outlined">New entry</Button>
          
        </div>

        <MangaListView readData={false} list={manga}/>
        

      </main>
    );
  }
  