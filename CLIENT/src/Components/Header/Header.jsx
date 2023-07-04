import { useState } from "react";
import {Button} from "@mui/material";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
    styled,
  ListItem
} from "@mui/material";

import { Menu } from "@mui/icons-material";

import { Link } from "react-router-dom";

//components
import CustomButtons from "./CustomButtons";

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;

const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  color: #ffffff;
  text-decoration: none;
`;

const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

const PlusImage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const CustomButtonWrapper = styled("span")(({ theme }) => ({
  margin: "0 5% 0 auto",
 
}));

const Header = () => {



  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <StyledHeader position="fixed">
      <Toolbar style={{ minHeight: 55 }}>
       

        <Component to="/">
       
          <Box component="span" style={{ display: "flex" }}>
            <Typography variant="h5">Parking</Typography>
          </Box>
        </Component>
       
        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
