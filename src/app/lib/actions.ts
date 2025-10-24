'use server';

const API_URI = "http://192.168.0.87:3000/api/manga";

export async function GetAllManga() : Promise<Manga[] > {

    try {

        const response = await fetch(API_URI);
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
      const response = await fetch(`${API_URI}/${id}`, {

        // Cache result for 1 hour
        next: { revalidate: 3600 }, 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result as Manga | undefined;
    } catch (error: any) {
      console.error(error);
      return undefined;
    }
  }
  
