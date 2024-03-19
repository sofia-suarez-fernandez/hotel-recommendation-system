import { Typography, Box, Button } from "@mui/material";
import Layout from "../../4_templates/Layout/Layout";
import { useNotFoundStyles } from "./NotFoundStyles";

export const NotFound = (): JSX.Element => {
  const { classes } = useNotFoundStyles();

  return (
    <Layout>
      <Box className={classes.container}>
        <img
          src={require("../../../static/images/lost-astronaut.png")}
          alt="Lost Astronaut"
          style={{
            width: "250px",
            height: "250px",
          }}
        />
        <Box className={classes.textContainer}>
          <Typography variant="h1" className={classes.title}>
            404
          </Typography>
          <Typography className={classes.message}>
            The page you're looking for is lost in space!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/"
            className={classes.button}
          >
            Back to Search
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
