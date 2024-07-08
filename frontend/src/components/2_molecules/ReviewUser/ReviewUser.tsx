import { Box, Grid, Link, Tooltip, Typography } from "@mui/material";
import { ReviewUserProps } from "./ReviewUserInterfaces";
import { useReviewUserStyles } from "./ReviewUserStyles";
import { useReviewUserViewModel } from "./ReviewUserViewModel";
import { Hotel, DateRange, InfoOutlined } from "@mui/icons-material";
import { RatingNumber } from "../../1_atoms/RatingNumber/RatingNumber";

export const ReviewUser = ({ review }: ReviewUserProps): JSX.Element => {
  const { classes } = useReviewUserStyles();

  const { createdAt, updatedAt, hotelName, hotelLink } = useReviewUserViewModel(
    {
      review,
    }
  );

  return (
    <Grid container className={classes.wrapper}>
      <Grid container item xs={10} className={classes.infoWrapper}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <Hotel />
          </Grid>
          <Grid item xs={9}>
            <Link
              href={hotelLink || ""}
              variant="body1"
              className={classes.hotelName}
            >
              {hotelName}
            </Link>
          </Grid>
          <Grid item xs={2}>
            {/* <RatingNumber rating={review.rate} /> */}
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
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <DateRange />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2" className={classes.date}>
              {updatedAt === null ? createdAt : updatedAt}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Typography fontWeight="fontWeightBold" className={classes.review}>{review.review_title}</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Typography className={classes.review}>{review.review_text}</Typography>
      </Grid>
    </Grid>
  );
};
