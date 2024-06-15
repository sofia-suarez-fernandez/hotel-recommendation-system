import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DeleteReviewDialog } from "../DeleteReviewDialog/DeleteReviewDialog";
import { UpdateReviewDialog } from "../UpdateReviewDialog/UpdateReviewDialog";
import { ReviewProps } from "./ReviewInterfaces";
import { useReviewStyles } from "./ReviewStyles";
import { useReviewViewModel } from "./ReviewViewModel";
import { RatingNumber } from "../../1_atoms/RatingNumber/RatingNumber";

export const Review = ({ review }: ReviewProps): JSX.Element => {
  const { classes } = useReviewStyles();

  const { createdAt, updatedAt, username } = useReviewViewModel({
    review,
  });

  const activeUser = useSelector(
    (state: RootState) => state.user.user?.username
  );

  let ratingText = '';
  if (review.rate >= 9) {
    ratingText = 'Fantástico';
  } else if (review.rate >= 8) {
    ratingText = 'Fabuloso';
  } else if (review.rate >= 7) {
    ratingText = 'Bien';
  } else if (review.rate >= 6) {
    ratingText = 'Agradable';
  } else {
    ratingText = 'Regular';
  }

  return (
    <>
      <Grid container className={classes.wrapper}>
        <Box className={classes.infoWrapper}>
          <Box className={classes.avatarInfoWrapper}>
            <Avatar>
              <PersonIcon></PersonIcon>
            </Avatar>

            <Box className={classes.dateNameWrapper}>
              {/* <Typography className={classes.typography}>{username}</Typography> */}
              <Typography className={classes.typography}>
                {username ? username : "Anonymous"}
              </Typography>
              <Typography variant="body2">
                {updatedAt === null ? createdAt : updatedAt}
              </Typography>
            </Box>
          </Box>

          <RatingNumber rating={review.rate} />
        </Box>

        <Typography className={classes.typography}>{review.review_title}</Typography>
        <Typography className={classes.review}>{review.review_text}</Typography>
      </Grid>

      {activeUser === username && (
        <Box className={classes.buttonsWrapper}>
          <UpdateReviewDialog review={review} />

          <DeleteReviewDialog reviewId={review.id} />
        </Box>
      )}
      <Divider variant="middle" className={classes.divider} />
    </>
  );
};
