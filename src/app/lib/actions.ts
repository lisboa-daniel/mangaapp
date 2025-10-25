'use server';

const API_URI = process.env.API_URL;


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

      const action = await fetch(`${API_URI}`, options);

      if (!action.ok) {
        console.error(action.json());
      }  
      
      return action.status;
      
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



  
