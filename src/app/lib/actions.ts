

const API_URI = "http://192.168.0.222:3000/api/manga"

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

