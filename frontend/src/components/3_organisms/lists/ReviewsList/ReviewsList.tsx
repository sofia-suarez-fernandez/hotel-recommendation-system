import { Grid } from "@mui/material";
import { Review } from "../../../2_molecules/Review/Review";
import { ReviewsListProps } from "./ReviewsListInterfaces";
import { useReviewsListStyles } from "./ReviewsListStyles";

export const ReviewsList = ({ reviews }: ReviewsListProps): JSX.Element => {
  const { classes } = useReviewsListStyles();

  return (
    <Grid item container className={classes.wrapper}>
      {reviews?.map((review, id) => {
        return (
          <Grid container key={id} className={classes.innerWrapper}>
            <Review review={review} />
          </Grid>
        );
      })}
    </Grid>
  );
};
