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