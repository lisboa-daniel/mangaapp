'use client';

import { getUserFromSession } from "@/app/actions/auth";
import { useUser } from "@/app/context/userContext";
import { CircularProgress } from "@mui/material";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Page(){
    const {userId, setUserId} = useUser();


    useEffect( () => {

        setUserId(undefined);
        redirect("/");

    }, [])


    return (
        <main className="w-full flex justify-center items-center p-8 min-h-[88vh]">
        
            <CircularProgress/>
    
        </main>
    );
}