import { Grid } from "@mui/material";
import { Review } from "../../../2_molecules/Review/Review";
import { ReviewsListProps } from "./ReviewsListInterfaces";
import { useReviewsListStyles } from "./ReviewsListStyles";
import { useEffect, useState } from "react";

export const ReviewsList = ({ reviews }: ReviewsListProps): JSX.Element => {
  const { classes } = useReviewsListStyles();

  const [loadedIndex, setLoadedIndex] = useState(0);

  useEffect(() => {
    if (loadedIndex < 2) {
      const timer = setTimeout(() => {
        setLoadedIndex(loadedIndex + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loadedIndex]);

  return (
    <Grid item container className={classes.wrapper}>
      {reviews?.slice(0, loadedIndex + 1).map((review, id) => {
        return (
          <Grid container key={id} className={classes.innerWrapper}>
            <Review review={review} />
          </Grid>
        );
      })}
    </Grid>
  );
};
