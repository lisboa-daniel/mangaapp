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


  //   useEffect(() => {
  //   const fetchMangas = async () => {
  //     const data = await GetAllManga(); // returns Manga[]
  //     setMangas(data);
  //   };

  //   fetchMangas();
  // }, []);

  
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body>
          <Suspense fallback={<Skeleton />}>
            <Navbar/>
          </Suspense>
          {children}
          <Footer/>
        </body>
      </html>
    </ThemeProvider> 
 
 
  );
}

