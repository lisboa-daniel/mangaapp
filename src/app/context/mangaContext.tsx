'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context value
export interface MangaContextType {
  mangas: Manga[];
  setMangas: React.Dispatch<React.SetStateAction<Manga[]>>;
}

// Create the context with an initial value of undefined
export const MangaContext = createContext<MangaContextType | undefined>(undefined);

// Define the provider props type
interface MangaProviderProps {
  children: ReactNode;
}

export function MangaProvider({ children }: MangaProviderProps) {
  const [mangas, setMangas] = useState<Manga[]>([

    {"id":2,"title":"Spy x Family","author":"Tatsuya Endou","synopsis":"For the agent known as 'Twilight,' no order is too tall if it is for the sake of peace. Operating as Westalis' master spy, Twilight works tirelessly to prevent extremists from sparking a war with neighboring country Ostania. For his latest mission, he must investigate Ostanian politician Donovan Desmond by infiltrating his son's school: the prestigious Eden Academy. Thus, the agent faces the most difficult task of his career: get married, have a child, and play family.","status":"Publishing","tags":["Childcare","Slice-of-life","Action"],"demographic":"Shounen","serialization":"Shounen Jump+","picture":"https://cdn.myanimelist.net/images/manga/3/219741.jpg","ISBN":"9781974715466","createdAt":"2025-10-20 16:11:35.79","updatedAt":"2025-10-20 17:26:17.71"},{"id":3,"title":"Dandadan","author":"Yukinobu Tatsu","synopsis":"Momo Ayase strikes up an unusual friendship with her school’s UFO fanatic, whom she nicknames “Okarun” because he has a name that is not to be said aloud. While Momo believes in spirits, she thinks aliens are nothing but nonsense. Her new friend, meanwhile, thinks the exact opposite. To settle matters, the two set out to prove each other wrong—Momo to a UFO hotspot and Okarun to a haunted tunnel! What unfolds next is a beautiful story of young love…and oddly horny aliens and spirits?","status":"Publishing","tags":["Sobrenatural","Alien","Action"],"demographic":"Shounen","serialization":"Shounen Jump+","picture":"https://cdn.myanimelist.net/images/manga/2/248746.jpg","ISBN":"97819722845466","createdAt":"2025-10-20 17:23:43.268","updatedAt":"2025-10-20 17:23:43.268"}

  ]);

  return (
    <MangaContext.Provider value={{ mangas: mangas, setMangas: setMangas }}>
      {children}
    </MangaContext.Provider>
  );
}

// Custom hook to use the Manga context
export function useManga() {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error('useManga must be used within an MangaProvider');
  }
  return context;
}
