import { Divider, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Iticket {
  tipoChamado: String;
  idChamado: string;
  categoria: string;
  descricao: string;
}

const Cases:React.FC<Iticket> = ({tipoChamado, idChamado, categoria, descricao}) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));



  return (
    <Box marginRight={2} width={'100%'} marginBottom={ mobile ? 2 : 0} gridColumn={'1fr'}>
      <Paper sx={{ width: "100%", height: 216 }} variant="outlined">
        <Box padding={2} display={"flex"} flexDirection="column">
          <Box display={'flex'} justifyContent='space-between'>
            <Typography fontSize={mobile ? 10 : 20} variant="h5">{tipoChamado}</Typography>
            <Typography fontSize={mobile ? 10 : 20} variant="h5">{'#'+idChamado}</Typography>
          </Box>
          <Divider />
          <Box mt={1} mb={1}>
            <Typography variant="h6">{categoria}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">{descricao}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Cases;
