import { CircularProgress, Grid } from "@mui/material";
import { Section } from "./Section/Section";

export const Loading = (): JSX.Element => {
  return (
    <Section>
      <Grid container justifyContent="center">
        <CircularProgress color="secondary" />
      </Grid>
    </Section>
  );
};
