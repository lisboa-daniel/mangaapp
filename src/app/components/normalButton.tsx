'use client';

import { Button } from "@mui/material";

interface NormalButtonProps {
    onClick : () => void;
}

export default function NormalButton ({onClick} : NormalButtonProps) {
    
    return (
        <Button onClick={onClick} variant="outlined">Edit Entry</Button>
    );
    
}