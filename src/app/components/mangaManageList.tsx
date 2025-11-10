import { useEffect, useState } from "react";
import Overlay from "./overlay";
import { CreateBookmarkEntry, DeleteBookmarkEntry, GetBookmarks, GetBookmarksByMangaId } from "../lib/actions";
import { useUser } from "../context/userContext";
import { Avatar, Button, Divider, IconButton, List, ListItem, ListItemAvatar, MenuItem, Select } from "@mui/material";
import { Bookmark, BookmarkAdd, BookmarkOutlined, Delete } from "@mui/icons-material";
import { redirect } from "next/navigation";



interface MangaManageListProps {
    open : boolean;
    setOpen : (action : boolean) => void;
    data : Manga;

}

export default function MangaManageList({open, setOpen, data} : MangaManageListProps) {


    const {userId} = useUser();

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    const [selectedList, setSelectedList] = useState<string>('');
    const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);


    const newBookmarkEntry = async () => {
        
        try {
            const response = await CreateBookmarkEntry(

                {
                    bookmarkId: selectedList,
                    titleId: data.id
                }
    
            );
    
            if (response) {
                redirect("/bookmarks");
            }
        } catch (error : any) {
            throw error.message;
        }

    }

    const deleteBookmarkEntry = async (titleId : string, bookmarkId : string) => {

        try {
            const response = await DeleteBookmarkEntry(
                bookmarkId, titleId
            );

            if (response == 200) {
                console.log(response);

                const toDelete = bookmarks.filter( bke => bke.id != bookmarkId);
                setBookmarks(toDelete);
                

            }
             
    
        } catch (error) {
            throw error;
        }
        

    }

    const getBookmarks = async () => {
        
        let usingBookmarks = (await GetBookmarksByMangaId(data.id) as Bookmark[]);

        if (usingBookmarks)
            console.log(usingBookmarks);
        
        setBookmarks(usingBookmarks);

        let bookmarkMainList = await GetBookmarks() as Bookmark[];

        bookmarkMainList = bookmarkMainList.filter(bk => 
            !usingBookmarks.some(ubk => bk.id === ubk.id)
        );
        setBookmarkList(bookmarkMainList);
    }

    useEffect( () => {
        getBookmarks();
        

    }, [])


    const handleBookmarkEntry = async () => {
        const response = await CreateBookmarkEntry({bookmarkId: selectedList, titleId: data.id});

        if (response as number == 201){
            
        }
    }


    return (
        <Overlay open={open} setOpen={setOpen}>
            <div className="bg-lightbackground rounded-xl w-[380px] h-[400px] p-2 flex flex-col">
                <p className="font-bold text-primary">{data.title}</p>
                <p className="p-2">In bookmarks:</p>
                <Divider flexItem orientation="horizontal"/>

                
                <div id="scrollabe-list" className="overflow-y-auto">
                    <List>
                        {
                            bookmarks.map( (value, index) => (
                                <ListItem key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteBookmarkEntry(value.id, data.id)}>
                                    <Delete />
                                    </IconButton>
                                }
                                
                                >
                                <ListItemAvatar>
                                    <Avatar>
                                        <Bookmark />
                                    </Avatar>
                                </ListItemAvatar>
                              
                              {value.name}</ListItem>
                            ))
                        }
                    </List>
                </div>

                <Divider flexItem orientation="horizontal"/> 
                <div className="flex flex-col w-full mt-2 gap-2 p-2">
                    <p> Add to:</p>
                    <Select
                        labelId="bookmark-label"
                        id="bookmark_input"
                        value={selectedList}
                        label="Bookmark"
                        onChange={(e) => setSelectedList(e.target.value)}
                    >
                        {
                            bookmarkList.map( (value ,index) => (
                                <MenuItem value={value.id} key={index}>{value.name}</MenuItem>
                            ))
                        }
                      
                        
                    </Select>
                    <span className="w-full flex items-center justify-center">
                        <Button variant="outlined" startIcon={<BookmarkAdd/>} onClick={newBookmarkEntry}>  Add</Button>
                    </span>
                    
                </div>
                
            </div>
        </Overlay>

    );
}