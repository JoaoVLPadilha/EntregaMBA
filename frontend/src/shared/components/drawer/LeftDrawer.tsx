import React, { useEffect } from "react";

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { AddBox, ConfirmationNumber, DarkMode, Home, HomeMax } from "@mui/icons-material";
import { useAppThemeContext, useAuthContext, useDrawerContext } from "../../contexts";
import { ItemLink } from "../item-link/ItemLink";
interface ILeftDrawer {
  children?: JSX.Element[] | React.ReactElement;
}
const LeftDrawer: React.FC<ILeftDrawer> = ({ children }) => {
  const theme = useTheme();
  const { toggleTheme, themeName } = useAppThemeContext();
  const {isLogado, isLogadoMethod} = useAuthContext();
  const isHome = window.location.href.includes('login') || window.location.href.includes('cadastro')
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() =>{
      isLogadoMethod()
    },[])
  const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();
  return (
    <>
      <Box>
        <Drawer open={isHome || isLogado === false ? false : isDrawerOpen} variant={isHome || isLogado === false ? "temporary" : mobile ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
          <Box
            width={theme.spacing(28)}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box
              height={theme.spacing(20)}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Avatar
                sx={{
                  height: theme.spacing(12),
                  width: theme.spacing(12),
                }}
              />
            </Box>
            <Divider />
            <Box flex={1}>
              <List component={"nav"}>
                <ItemLink icon={<ConfirmationNumber/>} label="Tickets" to="/tickets" onClick={() =>{}}/>
                <ItemLink icon={<AddBox/>} label="Criar Ticket" to="/create-ticket" onClick={() =>{}}/>
                <ListItemButton>
                  <ListItemIcon>
                    <DarkMode />
                  </ListItemIcon>
                  <Switch onChange={toggleTheme} checked={themeName === 'dark'} />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Drawer>
        <Box height={"100%"} marginLeft={mobile || isHome ? 0 : theme.spacing(28)}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default LeftDrawer;
