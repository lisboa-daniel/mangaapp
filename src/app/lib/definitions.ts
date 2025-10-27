

type Link =  {
    title : string,
    href: string
}

type Manga = {
    id : number
    title: string
    author: string
    status: string
    tags: string[]
    demographic: string
    serialization: string
    picture: string
    ISBN: string
    synopsis?: string
    createdAt : string
    updatedAt : string
}

type NewMangaEntity =  {
    title: string
    author: string
    status: string
    tags: string[]
    demographic: string
    serialization: string
    picture: string
    ISBN: string
    synopsis?: string

}


type User = {
  name: string
  email: string
  password: string
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