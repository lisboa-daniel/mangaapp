'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { getUserFromSession } from "../actions/auth";
import { MangaContext } from "./mangaContext";


export interface UserContextType {
    userId: string | undefined;
    setUserId: Dispatch<SetStateAction<string | undefined>>;
}


export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider( {children} : UserProviderProps){

    const [userId, setUserId] = useState<string | undefined>('');

    useEffect(() => {
        const fetchUserSession = async () => {
          const data = await getUserFromSession();
          setUserId(data?.id);
        };
    
        fetchUserSession();
      }, []);
    

    return (
        <UserContext.Provider value={{
            userId: userId,
            setUserId: setUserId
        }}>
            {children}
        </UserContext.Provider>
    )
   
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useuSER must be used within an uSERProvider');
    }
    return context;
  }
  