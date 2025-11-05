;
import Collapse from '@mui/material/Collapse';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { Button, Divider } from '@mui/material';
import { useState } from 'react';
import MangaListView from './mangaListView';




interface BookmarkListProps {
    data : BookmarkWithData
    defaultValue?: boolean
}

export default function BookmarkList({defaultValue=false, data} : BookmarkListProps) {
  const [open, setOpen] = useState(defaultValue);
    console.log(`${data.bookmark.name}`)
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='mt-2'>
        
        <span>
            <Button onClick={handleClick}>{data.bookmark.name}{open ? <ExpandLess /> : <ExpandMore />}</Button>
        </span>
        <Divider className='w-[400px] mb-4' flexItem orientation='horizontal'/>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <div className='ml-5 mt-2'>
               {data.titles && <MangaListView list={data.titles}/>}

               {(data.titles && (!(data.titles.length > 0))) && <p>List is empty.</p>}
            </div>
        </Collapse>
    </div>
  );
}
