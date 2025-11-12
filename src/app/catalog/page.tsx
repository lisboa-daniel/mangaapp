'use client';

import { Button, Divider, TextField } from "@mui/material";
import { useManga } from "../context/mangaContext";
import MangaListView from "../components/mangaListView";
import { useEffect, useState } from "react";
import { GetAllManga } from "../lib/actions";
import { useUser } from "../context/userContext";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function List() {

  const [manga, setManga] = useState<Manga[]>([]);
  const [viewManga, setViewManga]= useState<Manga[]>([]);
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search, 300);

  const checkSearch = () => {
    
    if (search != "" && search != " " && search.length > 1) {
      console.log("is running");
      const filteredManga = manga.filter( m => (m.title.toLowerCase().includes(search.toLowerCase()) || m.author.toLowerCase().includes(search.toLowerCase())));
      setViewManga(filteredManga);
    } else setViewManga(manga);
    

   
  }
  
  const {userId} = useUser();

  useEffect(() => {
    const fetchMangas = async () => {
      const data = await GetAllManga(); // returns Manga[]
      setManga(data);
      setViewManga(data);
    };

    fetchMangas();
  }, []);


  useEffect( () => {
    checkSearch();
  }, [debouncedSearch]);




    return (
      <main className="w-full flex flex-col  p-12 min-h-[88vh]">
        <p className="title text-2xl mb-2"> Manga Catalog </p>
        
        <Divider className="w-full mt-2 mb-2" flexItem orientation="horizontal"/>


        <div className="flex flex-row p-2 items-center justify-start mb-2 gap-2">
          <p>Search</p> 
          
          <TextField className="text-sm"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-input": {
              height: '17px', // Adjust as needed
              paddingTop: '8px', // Adjust padding for vertical alignment
              paddingBottom: '8px',
            },
          }}
          />

          {userId && <Button onClick={() => {window.location.href = '/catalog/manga/new'}} variant="outlined">New entry</Button>}
          
        </div>

        <MangaListView readData={false} list={viewManga}/>
        

      </main>
    );
  }
  