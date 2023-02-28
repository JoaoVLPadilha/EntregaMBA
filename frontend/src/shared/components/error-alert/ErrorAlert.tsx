import { Alert, Box, Button, Collapse, Icon, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'


interface IErrorAlert{
    openAlert: boolean
    setOpenAlert: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    alertText: string;
}
const ErrorAlert:React.FC<IErrorAlert> = ({openAlert, setOpenAlert, alertText}) => {
    
  return (
    <Box sx={{ width: '100%' }}>
    <Collapse in={openAlert}>
      <Alert
      severity='warning'
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
                setOpenAlert(false);
            }}
          >
            <CloseIcon color='warning'/>
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <Typography color={'warning'}>{alertText}</Typography>
      </Alert>
    </Collapse>
  </Box>
  )
}

export default ErrorAlert