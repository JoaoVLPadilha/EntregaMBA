import { Mail, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDrawerContext } from "../../contexts";
import MenuIcon from '@mui/icons-material/Menu';
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});


const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

interface INavbar{
  razaoSocial?: string
}



const Navbar:React.FC<INavbar> = ({razaoSocial}) => {

  React.useEffect(() =>{
    console.log(razaoSocial)
  },[])
  const { toggleDrawerOpen } = useDrawerContext();
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
        >
          {razaoSocial}
        </Typography>
        <ButtonBase onClick={toggleDrawerOpen}>
          <MenuIcon sx={{ display: { xs: "block", sm: "none" } }} />
        </ButtonBase>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
