import { Avatar, Box, Divider, Grid, Tooltip, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { DeleteReviewDialog } from "../DeleteReviewDialog/DeleteReviewDialog";
import { UpdateReviewDialog } from "../UpdateReviewDialog/UpdateReviewDialog";
import { ReviewProps } from "./ReviewInterfaces";
import { useReviewStyles } from "./ReviewStyles";
import { useReviewViewModel } from "./ReviewViewModel";
import { RatingNumber } from "../../1_atoms/RatingNumber/RatingNumber";
import { InfoOutlined } from "@mui/icons-material";

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
              <Typography className={classes.typography}>
                {username ? username : "Anonymous"}
              </Typography>
              <Typography variant="body2">
                {updatedAt === null ? createdAt : updatedAt}
              </Typography>
            </Box>
          </Box>

          {review && review.rate && review.created_by && (
            <Box className={classes.rateInfoWrapper}>
             <Tooltip title={review.created_by === 1 ? "Automated Rating: Derived from Sentiment Analysis" : "User Rating: Submitted by User"}>
                <Typography>
                  <RatingNumber rating={review.rate} />
                  <InfoOutlined className={classes.infoIcon} />
                </Typography>
              </Tooltip>
            </Box>
          )}
        </Box>

        <Typography className={classes.typography}>
          {review.review_title}
        </Typography>
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
