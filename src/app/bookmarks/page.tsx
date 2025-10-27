'use client';

import { useEffect, useState } from "react";
import { GetBookmarks } from "../lib/actions";
import { Button, Divider, TextField } from "@mui/material";
import { BookmarkAdd } from "@mui/icons-material";


export default function Profile() {

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    const getBookmarks = async () => {
        const result : Bookmark[] | undefined = await GetBookmarks();

        if (result) {
            setBookmarks(result);
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
                        <p className="font-bold">{value.name}</p>
                   </li> 
                ))
            }
            </ul>
            </div>
            
        </main>
    );
  }
  