'use client';

import { useEffect, useState } from "react";
import { GetBookmarks, GetMangaByBookmarkList } from "../lib/actions";
import { Button, Divider, TextField } from "@mui/material";
import { BookmarkAdd } from "@mui/icons-material";
import BookmarkList from "../components/bookmarkList";


export default function Profile() {

    const [bookmarks, setBookmarks] = useState<BookmarkWithData[]>([]);
    

    const getBookmarks = async () => {
        const result : Bookmark[] | undefined = await GetBookmarks();

        let resultWithTitleData : BookmarkWithData[] = [];

        if (result) {
          for (const bk of result as Bookmark[]) {
                let titles : Manga[] = [];

                const foundTitles : Manga[] | undefined = await GetMangaByBookmarkList(bk.id);

                if (foundTitles)
                    titles = foundTitles as Manga[];



                resultWithTitleData.push({ bookmark: bk, titles: titles });
            }
           
            setBookmarks(resultWithTitleData);
            
        }

    }

    useEffect(() => {
        getBookmarks();
    }, [])

    return (
        <main className="w-full flex flex-col justify-start items-start p-8 min-h-[88vh]">
            <p className="title text-2xl">Bookmarks</p>
            <Divider className="text-white" flexItem orientation="horizontal"/>


            <div className="flex flex-col p-4 gap-2 items-start justify-start">

            <span className="flex flex-row gap-2 p-2"><TextField label="Bookmark name"/> <Button variant="contained" startIcon={<BookmarkAdd/>}>New Bookmark</Button></span>
            <ul>
            {
                bookmarks.map( (value, index) => (
                   <li key={index}> 
                        
                        <BookmarkList defaultValue={(index ==0)} data={value}/>
                   </li> 
                ))
            }
            </ul>
            </div>

            
            
        </main>
    );
  }
  