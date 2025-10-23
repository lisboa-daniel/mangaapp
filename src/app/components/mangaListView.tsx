import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


interface MangaListViewProps {
  list : Manga[];
}


function MangaItem({data} : {data:Manga}){

  const router = useRouter();

  const goToPage = (uri : string) => {
  
    router.replace(uri)  ;
  }
  const [optionsHover, setOptionsHover] = useState<Boolean>(false);

  return (
        <div className='flex flex-col p-2 items-center justify-center'>
                  <a href={`catalog/manga/${data.id}`}><p className='w-full text-center mb-2'>{data.title}</p></a>
                  <div id='mangapanel' className='flex flex-row gap-2 items-center justify-center'  onMouseLeave={() => setOptionsHover(false)} >
                    
                    <Box sx={{position: 'relative', zIndex: 1}} onMouseEnter={() => setOptionsHover(true)} onClick={(e) => setOptionsHover(!optionsHover)}>                    
                      <img className='rounded float-left w-[200px]' src={data.picture}  />

                      <div className='flex flex-col gap-2 absolute z-2 items-center justify-end w-full h-full '>
                        <Box sx={{opacity: optionsHover? 1 : 0}} className={`flex flex-col items-center justify-end w-full  p-2 bg-black/50 transition-opacity ease-in-out ${(optionsHover) ? 'opacity-100' : 'opacity-0'}}`}>
                            <span id='menuButtons' className='flex flex-col pointer-events-auto gap-2 z-3' onClick={(e) => e.stopPropagation()}>

                              <Button variant='outlined'>Add to list</Button>
                              <Button onClick={() => goToPage(`/catalog/manga/${data.id}`)} variant='outlined'>Details</Button>
                              
                              <div className='border border-solid border-[#86c3c6] rounded p-2'>
                                <p className='text-primary-500'>Chapters Read</p>
                                  <span className='flex flex-row gap-2 items-center justify-center'>
                                    {/* <Button sx={{width: '10px'}} variant='outlined'>-</Button> */}
                                    <TextField className="text-sm"
                    
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        height: '17px', // Adjust as needed
                                        paddingTop: '2px', // Adjust padding for vertical alignment
                                        paddingBottom: '2px',
                                        width: '12px',
                                      },
                                    }}
                                    />
                                    <p>/</p>
                                    <TextField className="text-sm"
                                    
                    
                                    sx={{
                                      "& .MuiOutlinedInput-input": {
                                        height: '17px', // Adjust as needed
                                        paddingTop: '2px', // Adjust padding for vertical alignment
                                        paddingBottom: '2px',
                                        width: '12px',
                                      },
                                    }}
                                    />
                                    {/* <Button variant='outlined'>-</Button> */}
                                  
                                
                                  </span>
                              </div>
                            </span>
                           
                          
                        </Box>
                      </div>
                      
                      </Box>
                  </div>
                     <p className='synopsis text-justify mt-2 '>{data.synopsis}</p>
                  
              </div>
  );
}

export default function MangaListView({list} : MangaListViewProps) {

  const [optionsHover, setOptionsHover] = useState<Boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {list.map((value, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              

              <MangaItem key={index} data={value}/>

            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
