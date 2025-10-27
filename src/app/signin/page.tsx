'use client';


import { Login } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { signin, signup } from "../actions/auth";


export default function Page() {


    //fields

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    
    const [state, action, pending] = useActionState(signin, undefined);

    return (
        <main className="w-full flex justify-center items-center p-8 min-h-[88vh]">
        <div id="form-new-manga" className="flex flex-col md:flex-row p-2 ">

            <span className="flex flex-col gap-4 border border-primary-500 rounded p-2 w-full md:w-[420px] md:mt-0 mt-2 mb-2 md:mr-2 md:max-h-[520px]">

                <p className="title text-center w-full">Sign In</p>
                <form  action={action} className="flex flex-col p-2 gap-4 items-center justify-center w-full">
                    

                    <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    name="email"
                    id="email"
                    aria-label="email_input"
            
                    />

                   
 
                    <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    id="password"
                    aria-label="password_input"
                    name="password"
                    type="password"
                    />
                    
                                    

                    <Button type="submit" startIcon={<Login/>} variant="contained">Login</Button>
                </form>
         
            </span>

        
        </div>
    </main>
    );
}