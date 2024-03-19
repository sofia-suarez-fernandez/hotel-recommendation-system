import { Grid, Typography } from "@mui/material";
import { ResetPasswordConfirmForm } from "../../../features/user/components/ResetPasswordConfirmForm/ResetPasswordConfirmForm";
import { Section } from "../../1_atoms/Section/Section";
import Layout from "../../4_templates/Layout/Layout";
import { useResetPasswordConfirmStyles } from "./ResetPasswordConfirmStyles";

export const ResetPasswordConfirm = (): JSX.Element => {
  const { classes } = useResetPasswordConfirmStyles();
  return (
    <Layout>
      <Section>
        <Typography variant="h1" textAlign="center">
          Confirm the password
        </Typography>

        <Grid container className={classes.wrapper}>
          <ResetPasswordConfirmForm />
        </Grid>
      </Section>
    </Layout>
  );
};
