import ExploreIcon from '@mui/icons-material/Explore';
import { Grid, Typography } from "@mui/material";
import { SignInForm } from "../../../features/user/components/SignInForm/SignInForm";
import Layout from "../../4_templates/Layout/Layout";
import { useSignInStyles } from "./SignInStyles";

export const SignIn = (): JSX.Element => {
  const { classes } = useSignInStyles();

  return (
    <Layout>
      <Grid container className={classes.wrapper} spacing={2}>
        <Grid item xs={4} className={classes.leftColumn}>
          <ExploreIcon className={classes.icon} />
          <br />
          <Typography variant="h1" textAlign="center" mb={0.5}>
            Welcome back <br /> to viaggIO
          </Typography>
          <Typography variant="body1" textAlign="center">
            To keep connected with us please login <br />with your personal info
          </Typography>
        </Grid>
        <Grid item xs={8} className={classes.rightColumn}>
          <SignInForm />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignIn;
