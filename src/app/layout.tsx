'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";


import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { Footer } from "./components/footer";
import { MangaProvider, useManga } from "./context/mangaContext";
import { Suspense, useEffect } from "react";
import { GetAllManga } from "./lib/actions";
import { Skeleton } from "@mui/material";
import { UserContext, UserProvider, useUser } from "./context/userContext";





const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a9f6fa',
    },
    secondary: {
      main: '#fa59c2',
    },
    text: {
      primary: '#eeeeee',
    },
    background: {
      default: '#222831',
      paper: '#31363f',
    },

   
  },

  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body>
            
              <Navbar />
          
            {children}
            <Footer/>
          </body>
        </html>
      </ThemeProvider> 
    </UserProvider>
  
 
  );
}

