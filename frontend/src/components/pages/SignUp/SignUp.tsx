import ExploreIcon from '@mui/icons-material/Explore';
import { Grid, Typography } from "@mui/material";
import { SignUpForm } from "../../../features/user/components/SignUpForm/SignUpForm";
import Layout from "../../4_templates/Layout/Layout";
import { useSignUpStyles } from "./SignUpStyles";

export const SignUp = (): JSX.Element => {
  const { classes } = useSignUpStyles();

  return (
    <Layout>
      <Grid container className={classes.wrapper} spacing={2}>
        <Grid item xs={4} className={classes.leftColumn}>
          {/* <img
            src={require("../../../static/images/key-room.png")}
            alt="Icon"
            style={{ width: "62px", height: "62px", alignItems: "left" }}
          /> */}
          <ExploreIcon className={classes.icon} />
          <br />
          <Typography variant="h1" textAlign="left">
            Discover the world's <br /> best hotels in viaggIO
          </Typography>
          <Typography variant="body1" textAlign="center">
            To keep connected with us please sign up <br />
            with your personal info
          </Typography>
        </Grid>
        <Grid item xs={8} className={classes.rightColumn}>
          <SignUpForm />
        </Grid>
      </Grid>
    </Layout>
  );
};
