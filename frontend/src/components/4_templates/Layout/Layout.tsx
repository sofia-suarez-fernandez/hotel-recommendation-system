import { Box } from "@mui/material";
import { useEffect } from "react";
import {
  checkUserAuthentication,
  loadUser,
} from "../../../services/authentication";
import { Footer } from "../../3_organisms/Footer/Footer";
import { Header } from "../../3_organisms/sections/Header/Header";
import { LayoutProps } from "./LayoutInterfaces";
import { useLayoutStyles } from "./LayoutStyles";

const Layout = ({ children, isGreyBackground }: LayoutProps): JSX.Element => {
  const { classes } = useLayoutStyles({ isGreyBackground });

  // Check authentication when navigating to another page or reloading the current page
  useEffect(() => {
    loadUser();
    checkUserAuthentication();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Header />

      {children}

      <Footer />
    </Box>
  );
};

export default Layout;
