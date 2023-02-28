import {
    Avatar,
    Button,
    ButtonGroup,
    Fab,
    Modal,
    Stack,
    styled,
    TextField,
    Tooltip,
    Typography,
    useTheme
  } from "@mui/material";
  import React, { useState } from "react";
  import {
    Add as AddIcon,
  } from "@mui/icons-material";
  import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
//   import { useTheme } from '@mui/material/styles';
  const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  
  const UserBox = styled(Box)({ 
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  });
const Add = () => {
    const navigate = useNavigate()
    const theme = useTheme();
  return (
    <>

      <Tooltip
        onClick={() => navigate('/create-ticket')}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", sm:"calc(60%)", md: "calc(60%)", lg: "calc(60% - 50px)", xl: "calc(50% - 25px)" },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default Add;
