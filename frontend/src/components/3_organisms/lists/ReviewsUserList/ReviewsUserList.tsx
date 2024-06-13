import { Box, Divider, Grid } from "@mui/material";
import { DeleteReviewDialog } from "../../../2_molecules/DeleteReviewDialog/DeleteReviewDialog";
import { ReviewUser } from "../../../2_molecules/ReviewUser/ReviewUser";
import { UpdateReviewDialog } from "../../../2_molecules/UpdateReviewDialog/UpdateReviewDialog";
import { ReviewsUserListProps } from "./ReviewsUserInterfaces";
import { useReviewsUserListStyles } from "./ReviewsUserListStyles";
import { useEffect, useState } from "react";

export const ReviewsUserList = ({
  reviews,
}: ReviewsUserListProps): JSX.Element => {
  const { classes } = useReviewsUserListStyles();
  
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
    <Grid item container className={classes.reviewWrapper}>
      {reviews?.slice(0, loadedIndex + 1).reverse().map((review) => {
        return (
          <Box key={review.id}>
            <Grid container className={classes.reviewInnerWrapper}>
              <ReviewUser review={review} />

              <Box className={classes.buttonsWrapper}>
                <UpdateReviewDialog review={review} />

                <DeleteReviewDialog reviewId={review.id} />
              </Box>
            </Grid>

            <Divider variant="middle" className={classes.divider} />
          </Box>
        );
      })}
    </Grid>
  );
};
