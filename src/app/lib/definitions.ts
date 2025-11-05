

type Link =  {
    title : string,
    href: string
}

type Manga = {
    id : string,
    submited_by : string,
    title: string,
    author: string,
    status: number,
    tags: string[],
    demographic: string,
    serialization: string,
    picture: string,
    isbn: string,
    synopsis?: string,
    created_at : string,
    updated_at : string,
    maxChapter?: number,
    maxVolume? : number
}

type NewMangaEntity =  {
    submited_by : string,
    title: string,
    author: string,
    status: number,
    tags: string[],
    demographic: string,
    serialization: string,
    picture: string,
    isbn: string,
    synopsis?: string,

}


type User = {
  name: string
  email: string
  password: string
  role?: number
}

 

type DecodedSessionPayload = {
    id : string,
    email : string
}


type Bookmark = {
    id: string,
    userId: string,
    name: string,
    createdAt: string,
    updatedAt: string
}


type BookmarkWithData = {
    bookmark: Bookmark 
    titles: Manga[]
}