import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { CustomRating } from "../CustomRating/CustomRating";
import { DeleteReviewDialog } from "../DeleteReviewDialog/DeleteReviewDialog";
import { UpdateReviewDialog } from "../UpdateReviewDialog/UpdateReviewDialog";
import { ReviewProps } from "./ReviewInterfaces";
import { useReviewStyles } from "./ReviewStyles";
import { useReviewViewModel } from "./ReviewViewModel";

export const Review = ({ review }: ReviewProps): JSX.Element => {
  const { classes } = useReviewStyles();

  const { createdAt, updatedAt, username } = useReviewViewModel({
    review,
  });

  const activeUser = useSelector(
    (state: RootState) => state.user.user?.username
  );

  return (
    <>
      <Grid container className={classes.wrapper}>
        <Box className={classes.infoWrapper}>
          <Box className={classes.avatarInfoWrapper}>
            <Avatar>
              <PersonIcon></PersonIcon>
            </Avatar>

            <Box className={classes.dateNameWrapper}>
              <Typography className={classes.typography}>{username}</Typography>

              <Typography variant="body2">
                {updatedAt === null ? createdAt : updatedAt}
              </Typography>
            </Box>
          </Box>

          <CustomRating value={review.rate} readOnly={true} />
        </Box>

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
