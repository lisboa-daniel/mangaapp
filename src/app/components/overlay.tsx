import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ReactElement, ReactNode } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'transparent',

  p: 4,
};

interface OverlayProps {
  open : boolean
  setOpen  : (action : boolean) => void;
  children : ReactElement
}

export default function Overlay({children, open, setOpen} : OverlayProps) {


  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {children}
        </Box>
        
      </Modal>
    </div>
  );
}
