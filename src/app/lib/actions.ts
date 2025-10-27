'use server';

import { redirect } from "next/navigation";
import { getUserFromSession } from "../actions/auth";

const API_URI = process.env.API_URL + "manga";


export async function DeleteManga(id : number) : Promise<number> {
    try {

        const options: RequestInit = {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
        }

      const action = await fetch(`${API_URI}/${id}`, options);

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

      const response = await fetch(`${API_URI}`, options);

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


export async function UpdateManga(id : number, item : NewMangaEntity) : Promise<number> {
    try {

        const options: RequestInit = {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }

      const action = await fetch(`${API_URI}/${id}`, options);

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

        const response = await fetch(`${API_URI}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result)
            return result as Manga[];

        return [];

    } catch (error : any){
        throw error;
    }

}

export async function GetMangaById(id: string): Promise<Manga | undefined> {
    try {
      const response = await fetch(`${API_URI}/${id}`);
  
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