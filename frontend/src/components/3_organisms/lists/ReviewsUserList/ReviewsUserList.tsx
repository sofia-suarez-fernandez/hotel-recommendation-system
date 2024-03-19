import { Box, Divider, Grid } from "@mui/material";
import { DeleteReviewDialog } from "../../../2_molecules/DeleteReviewDialog/DeleteReviewDialog";
import { ReviewUser } from "../../../2_molecules/ReviewUser/ReviewUser";
import { UpdateReviewDialog } from "../../../2_molecules/UpdateReviewDialog/UpdateReviewDialog";
import { ReviewsUserListProps } from "./ReviewsUserInterfaces";
import { useReviewsUserListStyles } from "./ReviewsUserListStyles";

export const ReviewsUserList = ({
  reviews,
}: ReviewsUserListProps): JSX.Element => {
  const { classes } = useReviewsUserListStyles();

  return (
    <Grid item container className={classes.reviewWrapper}>
      {reviews?.reverse().map((review) => {
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
