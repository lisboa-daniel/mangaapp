'use server';

import { redirect } from "next/navigation";
import { getUserFromSession } from "../actions/auth";
import { UploadClient } from '@uploadcare/upload-client';

const API_URI = process.env.API_URL;


export async function DeleteManga(id : string) : Promise<number> {
    try {

        const options: RequestInit = {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
        }

      const action = await fetch(`${API_URI}manga/${id}`, options);

      if (!action.ok) {
        console.error(action.json());
      }  
      
      return action.status;
      
    } catch (error : any) {
      throw error;
    } 
}

export async function CreateManga(item : NewMangaEntity) : Promise<number> {
    try {

        const options: RequestInit = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }

      const response = await fetch(`${API_URI}manga/`, options);

      if (response.status != 201) {
        console.error(response.json());
      }  else {
        
        redirect("/catalog");
      }
      
      return response.status;
      
    } catch (error : any) {
      throw error;
    } 
}


export async function UpdateManga(id : string, item : NewMangaEntity) : Promise<number> {
    try {

        const options: RequestInit = {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }

      const action = await fetch(`${API_URI}manga/${id}`, options);

      if (!action.ok) {
        console.error(action.json());
      }  
      
      return action.status;
      
    } catch (error : any) {
      throw error;
    } 
}


export async function GetAllManga() : Promise<Manga[] > {

    try {

        const response = await fetch(`${API_URI}manga`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result)
            return result as Manga[];

        return [];

    } catch (error : any){
        console.error(error.message);
        throw error;
    }

}


export async function GetBookmarksByMangaId(titleId : string) : Promise<Bookmark[] | undefined> {

  let userId = ""
  const session : DecodedSessionPayload | null = await getUserFromSession();
  if (session) {
    userId  = session.id;

  }


  try {
      const response = await fetch(`${API_URI}bookmark/user/${userId}/manga/${titleId}`);

      return await response.json();

  } catch (error) {
    throw error;
  }


}

export async function GetMangaByBookmarkList(bookmarkId : string) : Promise<Manga[] | undefined> {
  try {

    const response = await fetch(`${API_URI}bookmarkEntry/manga/${bookmarkId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
    if (result)
        return result as Manga[];

    return [];

} catch (error : any){
    console.error(error.message);
    throw error;
}

}

export async function GetMangaById(id: string): Promise<Manga | undefined> {
    try {
      const response = await fetch(`${API_URI}manga/${id}`);
  
      if (response.status != 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result as Manga | undefined;
    } catch (error: any) {
      console.error(error);
      return undefined;
    }
  }


export async function CreateBookmarkEntry(item : BookmarkEntry) : Promise<number>{
  try {

    const options: RequestInit = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }

  const response = await fetch(`${API_URI}bookmarkEntry/`, options);

  if (response.status != 201) {
    console.error(response.json());
  }  

  return response.status;

  } catch (error : any) {
  throw error;
  } 
}


export async function DeleteBookmarkEntry(titleId : string, bookmarkId : string) : Promise<number> {
  try {

      const options: RequestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
      }

    const action = await fetch(`${API_URI}bookmarkEntry/${bookmarkId}/${titleId}`, options);

    if (!action.ok) {
      console.error(action.json());
    }  
    
    return action.status;
    
  } catch (error : any) {
    throw error;
  } 
}


export async function GetBookmarks() {

  const session : DecodedSessionPayload | null = await getUserFromSession();
  if (session) {
    const userId : string = session.id;
    const uri = process.env.API_URL + `bookmark/user/${userId}`;

    const response = await fetch(uri);


    if (response.ok){
      const result = await response.json();

      return result as Bookmark[];
    } else {
      console.error("could not fetch data");
    }
  }
  
}



export  async function fileupload(data : File) : Promise<string | undefined> {

  const ext = getFileExtension(data.name);

  const client = new UploadClient({ publicKey: `${process.env.NEXT_UPLOADCARE_KEY}` });

  try {

    const file = await client.uploadFile(data, {
      fileName: data.name,
      contentType: `image/${ext}`
    })
    

    if (file) {
      return file.cdnUrl;
    }

    return undefined;
  } catch (err : any){
    throw err;
  }


}

function getFileExtension(filename : string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = filename.match(regex);
  return match ? match[1] : undefined;
}