import { Grid, Typography } from "@mui/material";
import Layout from "../../4_templates/Layout/Layout";
import { useProjectOverviewStyles } from "./ProjectOverviewStyles";
import React from "react";

export const ProjectOverview = (): JSX.Element => {
  const { classes } = useProjectOverviewStyles();

  return (
    <Layout>
      <Grid container className={classes.wrapper} spacing={2}>
        <Grid item xs={4} className={classes.leftColumn}>
          <Typography variant="h1" align="center">
            Project <br /> Overview
          </Typography>
        </Grid>
        <Grid item xs={8} className={classes.rightColumn}>
          <Typography variant="h2" width="60%">
            Implicit Feedback-Based Hotel Recommendation System
          </Typography>
          <br />
          <Typography variant="body1" width="60%" textAlign="justify">
            With the overwhelming amount of information available online,
            including hotel options, users struggle to make informed decisions.
            Hotel recommendation systems have emerged to assist users in their
            search for suitable acommodation.
            <br />
            This TFG proposes a web application with a hotel recommendation
            system that incorporates external information about hotels and
            users' reviews. This provides an updated and reliable perspective on
            hotels and guest experiences based on authentic opinions. The system
            aims to avoid overwhelming users with results and offer a more
            focused and personalized experience. <br />
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProjectOverview;
