'use client';

import { useManga } from "@/app/context/mangaContext";
import { CreateManga, DeleteManga, GetMangaById, UpdateManga } from "@/app/lib/actions";
import { DeleteForever, Save, UploadFile } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {


    const [manga, setManga] = useState<Manga | undefined>();


    const params = useSearchParams();

    useEffect( () => {
        if (params.get("edit")){
            let id = params.get("edit");
            loadData(id as string);
            
            

        }

    }, [params]);


    const loadData = async (id : string) => {
        const findManga = GetMangaById(id);
        if (findManga) {
            setManga(await findManga);
  
        }
           
    }

    const deleteData = async() => {
        try {
            if (manga){
                const request = await DeleteManga(manga?.id);

                if (request == 200){
                    window.location.href = "/catalog"
                }
            }
            

        } catch (error : any) {
            console.error(error);
        }
    }

    const saveData = async () => {

        const body : NewMangaEntity = {
            title : title,
            author: author,
            status: status,
            tags: tags.split(","),
            demographic: demographic,
            serialization: serialization,
            picture: 'picture',
            ISBN: ISBN,
            synopsis: synopsis

        };

        

        try {

            if (!manga){
                const response = CreateManga(body);
                console.log(await response);
            } else {
                const response = UpdateManga(manga.id , body);
                console.log(await response);
            }
       


        } catch (err : any) {
            console.error(err);
        }

    };


    useEffect(() => {
    if (manga !== undefined) {
        setTitle(manga.title);
        setAuthor(manga.author);
        setStatus(manga.status);
        setTags(manga.tags.join(", "));
        setDemographic(manga.demographic);
        setSerialization(manga.serialization);
        setSynopsis((manga.synopsis) ? manga.synopsis : "");
        setISBN((manga.ISBN) ? manga.ISBN : "");
        setImagePath(manga.picture);
    }
    }, [manga]);

    //fields

    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [demographic, setDemographic] = useState<string>('');
    const [serialization, setSerialization] = useState<string>('');
    const [synopsis, setSynopsis] = useState<string>('');
    const [ISBN, setISBN] = useState<string>('');
    const [imagePath, setImagePath] = useState<string>('/defaultCover.png');
    
  
    return (
        <main className="w-full flex justify-center p-8 min-h-[88vh]">
        <div id="form-new-manga" className="flex flex-col md:flex-row p-2">

            <span className="flex flex-col gap-4 border border-primary-500 rounded p-4  w-full md:w-[420px]  md:mt-0 mt-2 mb-2 md:mr-2 ">
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    id="title"
                    aria-label="title_input"
                    />
                    <TextField
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    label="Author"
                    id="author"
                    aria-label="author_input"
                    />
                    <TextField
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                    id="status"
                    aria-label="status_input"
                    />
                    <TextField
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    label="Tags"
                    id="tags"
                    aria-label="tags_input"
                    />
                    <TextField
                    value={demographic}
                    onChange={(e) => setDemographic(e.target.value)}
                    label="Demographic"
                    id="demographic"
                    aria-label="demographic_input"
                    />
                    <TextField
                    value={serialization}
                    onChange={(e) => setSerialization(e.target.value)}
                    label="Serialization"
                    id="serialization"
                    aria-label="serialization_input"
                  

                    />
                    <TextField
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    label="Synopsis"
                    id="synopsis"
                    aria-label="synopsis_input"
                    multiline
                    rows={4}
                    />
                    <TextField
                    value={ISBN}
                    onChange={(e) => setISBN(e.target.value)}
                    label="ISBN"
                    id="isbn"
                    aria-label="isbn_input"
                    />

                <Button onClick={saveData} startIcon={<Save/>} variant="outlined">Save</Button>
                {(manga) && <Button onClick={deleteData} startIcon={<DeleteForever/>} variant="outlined">Delete Entry</Button>}
         
            </span>

            <span className="border border-primary-500 rounded md:min-w-[280px] md:max-h-[420px] flex flex-col items-center justify-center p-2 gap-2">

                 <img src={imagePath}/>
                <Button startIcon={<UploadFile/>} variant="outlined">Upload Cover</Button>

               
            </span>

        </div>
    </main>
    );
}