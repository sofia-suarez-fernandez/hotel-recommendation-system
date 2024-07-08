import { Grid, Typography } from "@mui/material";
import { ActivateButton } from "../../../features/user/components/ActivateButton/ActivateButton";
import { Section } from "../../1_atoms/Section/Section";
import Layout from "../../4_templates/Layout/Layout";
import { useActivateStyles } from "./ActivateStyles";

export const Activate = (): JSX.Element => {
  const { classes } = useActivateStyles();

  return (
    <Layout>
      <Section>
        <Grid container className={classes.wrapper}>
          <Typography variant="h1">Verify your account</Typography>

          <ActivateButton />
        </Grid>
      </Section>
    </Layout>
  );
};
