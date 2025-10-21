import { Divider, TextField } from "@mui/material";


export default function List() {
    return (
      <main className="w-full flex flex-col  p-12 min-h-[88vh]">
        <p className="title text-2xl mb-2"> Manga List </p>
        
        <Divider className="w-full mt-2 mb-2" flexItem orientation="horizontal"/>


        <div className="flex flex-row p-2 items-center justify-start">
          <p className="mr-2">Search</p> <TextField className="h-[20px]"/>
        </div>
      </main>
    );
  }
  