'use client';

import React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';


// Define the shape of the data returned on a successful upload
interface UploadcareFileInfo {
  uuid: string;
  name: string;
  size: number;
  cdnUrl: string; // This is the file URL you need
  // ... other file properties
}

// Define the props for your component
interface UploadcareUploaderProps {
  // A void method that accepts the generated file URL as its argument
  onChange: (fileUrl: string) => void;
}

// Access the public key from the environment variables
const UPLOADCARE_PUBLIC_KEY = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || '';

const UploadcareUploader: React.FC<UploadcareUploaderProps> = ({ onChange }) => {

  // This handler runs when a file is successfully uploaded and processed.
  const handleSuccess = (fileInfo: UploadcareFileInfo) => {
    // The FileInfo object contains the final CDN URL.
    if (fileInfo && fileInfo.cdnUrl) {
      onChange(fileInfo.cdnUrl);
    }
  };

  if (!UPLOADCARE_PUBLIC_KEY) {
    return <p style={{ color: 'red' }}>Error: Uploadcare Public Key is missing.</p>;
  }

  return (
    <div className="uploadcare-container">
      <FileUploaderRegular
        ctxName='my-default-uploader-con'
        // Pass your Uploadcare public key
        pubkey={UPLOADCARE_PUBLIC_KEY}

        // Set to fire your method on successful upload
        onFileUploadSuccess={handleSuccess as any} // Cast as any to simplify generic type complexities
        // You can add more props here (e.g., maxFileSize, accept, multiple)
      />
    </div>
  );
};

export default UploadcareUploader;