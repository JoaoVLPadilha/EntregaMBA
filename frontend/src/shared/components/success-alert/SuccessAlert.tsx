import { Alert, Box, Button, Collapse, Icon, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'


interface ISuccessAlert{
    openAlert: boolean
    setOpenAlert: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    alertText: string;
}
const SuccessAlert:React.FC<ISuccessAlert> = ({openAlert, setOpenAlert,alertText}) => {
    
  return (
    <Box sx={{ width: '100%' }}>
    <Collapse in={openAlert}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
                setOpenAlert(false);
            }}
          >
            <CloseIcon color='success'/>
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <Typography color={'green'}>Ticket Criado com sucesso</Typography>
      </Alert>
    </Collapse>
  </Box>
  )
}

export default SuccessAlert