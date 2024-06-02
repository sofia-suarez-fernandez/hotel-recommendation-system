import { useFaqStyles } from "./FaqStyles";
import Layout from "../../4_templates/Layout/Layout";
import { Divider, Grid, Typography } from "@mui/material";

const FAQ = () => {
  const preguntas = [
    {
      pregunta: "What's a Recommendation System?",
      respuesta:
        "A recommendation system calculates and provides relevant content, recommendations, to the user based on its knowledge of the user, the content, and the interactions between the user and the item. These recommendations are usually related to products, services, content, or any other type of relevant information, with the aim of improving the user experience by anticipating and offering options that may be of interest.",
    },
    {
      pregunta: "What types of Recommendation Systems are there?",
      respuesta:
        "There are three main types of recommendation systems: Collaborative filtering, Content-based filtering and Hybrid filtering.",
    },
    {
      pregunta: "What is Collaborative Filtering?",
      respuesta:
        "This system uses the ratings of other users to recommend new items to a specific user. It focuses on leveraging correlations between items or users to make predictions.",
    },
    {
      pregunta: "What is Content-based Filtering?",
      respuesta:
        "This system recommends items that are similar to items the user has liked or interacted with in the past. It analyzes the attributes or features of items to make recommendations.",
    },
    {
      pregunta: "What is Hybrid Filtering?",
      respuesta:
        "This system combines collaborative filtering and content-based filtering techniques to provide more accurate and personalized recommendations.",
    },
  ];

  const { classes } = useFaqStyles();

  return (
    <Layout>
      <Grid container className={classes.faq}>
        <Typography variant="h1">FAQs</Typography>
        {preguntas.map((pregunta, index) => (
          <Grid key={index}>
            <Typography variant="h3" className={classes.pregunta}>
              {pregunta.pregunta}
            </Typography>
            <Typography variant="body1" className={classes.respuesta}>
              {pregunta.respuesta}
            </Typography>
            {index !== preguntas.length - 1 && <Divider className={classes.separador}></Divider>}
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default FAQ;
