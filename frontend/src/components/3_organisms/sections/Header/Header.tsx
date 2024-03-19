import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../app/store";
import { signOut } from "../../../../features/user/userSlice";
import { useHeaderStyles } from "./HeaderStyles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import AppRegistration from "@mui/icons-material/AppRegistration";
import React from "react";

export const Header = (): JSX.Element => {
  const { classes } = useHeaderStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const isAdmin = useSelector((state: RootState) => state.user.user?.is_staff);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.wrapper}>
      <Container>
        <Grid container className={classes.innerWrapper}>
          <Grid item xs={3}>
            <Button color="inherit" href="/">
              <Typography
                variant="h2"
                fontWeight="fontWeightBold"
                className={classes.typography}
                style={{ margin: 0 }}
              >
                viaggIO
              </Typography>
            </Button>
          </Grid>

          {isAuthenticated === true ? (
            <Grid item xs={9} container className={classes.navItemsWrapper}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <PersonIcon></PersonIcon>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {isAdmin === false && (
                  <MenuItem onClick={() => navigate("/profile")}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <Typography>Profile</Typography>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    dispatch(signOut());
                    navigate("/");
                  }}
                >
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <Grid item xs={9} container className={classes.navItemsWrapper}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <PersonIcon></PersonIcon>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate("/sign_in")}>
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <Typography>Sign In</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/sign_up")}>
                  <ListItemIcon>
                    <AppRegistration />
                  </ListItemIcon>
                  <Typography>Sign Up</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          )}
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
