
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fileupload } from '../lib/actions';
import { UploadClient } from '@uploadcare/upload-client'
import { LinearProgress } from '@mui/material';
import { useState } from 'react';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

interface FileUploadProps {
    action : (path : string) => void
}


function getFileExtension(filename : string) {
    const regex = /(?:\.([^.]+))?$/;
    const match = filename.match(regex);
    return match ? match[1] : undefined;
  }

export default function FileUpload({action} : FileUploadProps) {

    // const ext = getFileExtension(data.name);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = async (files: FileList | null) => {


        if (!files || files.length === 0) return
        
        setIsUploading(true);
        const file = files[0];
    

        const client = new UploadClient({ publicKey: `${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}` });

        try {
       
            const uploadedFile = await client.uploadFile(file);


            if (uploadedFile){
                action(`${process.env.NEXT_PUBLIC_UPLOADCARE_APPURI}${uploadedFile.uuid}/`);
            }
        

            setIsUploading(false);


           
        } catch (err) {
            console.error('Upload failed:', err);
            setIsUploading(false);
        }
    }
    return (
        <div className='flex flex-col p-2 gap-2'>
            {isUploading && <LinearProgress />}
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                Upload image from computer
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleFileChange(event.target.files)}
                    
                    
                />
            </Button>
        </div>
        
    );
}