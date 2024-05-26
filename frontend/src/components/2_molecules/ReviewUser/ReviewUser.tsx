import { Grid, Link, Typography } from "@mui/material";
import { CustomRating } from "../CustomRating/CustomRating";
import { ReviewUserProps } from "./ReviewUserInterfaces";
import { useReviewUserStyles } from "./ReviewUserStyles";
import { useReviewUserViewModel } from "./ReviewUserViewModel";
import { Hotel, DateRange } from "@mui/icons-material";

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
            <CustomRating value={review.rate} readOnly={true} />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1}>
            <DateRange />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2">
              {updatedAt === null ? createdAt : updatedAt}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Typography className={classes.review}>{review.review_text}</Typography>
      </Grid>
    </Grid>
  );
};
