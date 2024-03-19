import { Grid, Typography } from "@mui/material";
import { ResetPasswordForm } from "../../../features/user/components/ResetPasswordForm/ResetPasswordForm";
import { Section } from "../../1_atoms/Section/Section";
import Layout from "../../4_templates/Layout/Layout";
import { useResetPasswordStyles } from "./ResetPasswordStyles";

export const ResetPassword = (): JSX.Element => {
  const { classes } = useResetPasswordStyles();

  return (
    <Layout>
      <Section>
        <Typography variant="h1" textAlign="center">
          Reset your password
        </Typography>

        <Grid container className={classes.wrapper}>
          <ResetPasswordForm />
        </Grid>
      </Section>
    </Layout>
  );
};
