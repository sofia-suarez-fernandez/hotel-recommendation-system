import { Container, Grid, Typography } from "@mui/material";
import { useFooterStyles } from "./FooterStyles";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";


export const Footer = (): JSX.Element => {
  const { classes } = useFooterStyles();
  const isAuthenticated = useSelector(
    (state: RootState) => (state.user as { isAuthenticated: boolean }).isAuthenticated
  );

  return (
    <Grid container className={classes.wrapper}>
      <Container>
        <Grid container spacing={2}>
          {/* Top row */}
          <Grid item xs={4}>
            <Typography variant="h4">viaggIO</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Discover</Typography>
            <ul className={classes.list}>
              <li>
                <Typography variant="body1" component="a" href={isAuthenticated ? "/profile" : "/sign_in"}>
                  My account
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="a" href="/faq">
                  FAQ
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">About Us</Typography>
            <ul className={classes.list}>
              <li>
                <Typography variant="body1" component="a" href="/author">
                  Author
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="a" href="/project">
                  Project Overview
                </Typography>
              </li>
            </ul>
          </Grid>
          {/* Bottom row */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              © Sofía Suárez Fernández
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
