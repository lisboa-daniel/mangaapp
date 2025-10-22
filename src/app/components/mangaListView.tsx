import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';

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

export default function MangaListView({list} : MangaListViewProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {list.map((value, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <div className='flex flex-col p-2 items-center justify-center'>
                  <p className='w-full text-center mb-2'>{value.title}</p>
                  <div id='mangapanel' className='flex flex-row gap-2 items-center justify-center'>
                     
                    <img className='rounded float-left w-[200px]' src={value.picture}/>
                    <ul className='flex flex-col gap-2'>
                          <li><Button variant='outlined'>Add to list</Button></li>
                          
                          <li className='border border-solid border-[#86c3c6] rounded p-2'>
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
                          </li>
                          <li></li>
                        </ul>
                  </div>

                  <p className='synopsis text-justify mt-2 '>{value.synopsis}</p>
                  
              </div>

            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
