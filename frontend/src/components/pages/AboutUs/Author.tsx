import { Grid, Typography, Avatar } from "@mui/material";
import Layout from "../../4_templates/Layout/Layout";
import { useAuthorStyles } from "./AuthorStyles";

export const Author = (): JSX.Element => {
  const { classes } = useAuthorStyles();

  return (
    <Layout>
      <Grid container className={classes.wrapper} spacing={2}>
        <Grid item xs={4} className={classes.leftColumn}>
          <Avatar
            alt="Author picture"
            src={require("../../../static/images/sofia.png")}
            sx={{ width: 200, height: 200 }}
          />
          <Typography variant="h1">This is me</Typography>
        </Grid>
        <Grid item xs={8} className={classes.rightColumn}>
          <Typography variant="h2" width="60%">
            Sofía Suárez Fernández - UO270149
          </Typography>
          <br />
          <Typography variant="body1" width="60%" textAlign="justify">
            I am a Software Engineering student with a bilingual degree. I
            overcame the challenges of the pandemic and an Erasmus+ in Rome to
            pursue my TFG on Recommendation Systems.
            <br /> I am excited to use my skills and experience to make a
            positive impact in the tech industry. I am confident that my
            bilingual abilities, cultural awareness, and strong work ethic will
            make me a valuable asset to any team. <br />
            In my free time, I enjoy painting and exercising. I am also an avid
            traveler and have visited many different countries.
            <br /> I am always looking for new challenges and opportunities to
            learn and grow. <br />
            Feel free to contact me to learn more.
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="body1">2024</Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Author;
