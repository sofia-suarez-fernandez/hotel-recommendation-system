import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Review } from "../../../../interfaces/review";
import { Loading } from "../../../1_atoms/Loading";
import { CreateReviewDialog } from "../../../2_molecules/CreateReviewDialog/CreateReviewDialog";
import { HotelReviewsPagination } from "../HotelReviewsPagination/HotelReviewsPagination";
import { HotelReviewsSectionProps } from "./HotelReviewsSectionInterfaces";
import { useHotelReviewsSectionStyles } from "./HotelReviewsSectionStyles";

export const HotelReviewsSection = ({
  reviews,
  loading,
}: HotelReviewsSectionProps): JSX.Element => {
  const { classes } = useHotelReviewsSectionStyles();

  const [selectedSort, setSelectedSort] = useState<number>(1);
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (reviews) {
      setSortedReviews(reviews);

      if (selectedSort === 1) {
        setSortedReviews(reviews);
      }
      if (selectedSort === 2) {
        const highestRating = [...reviews].sort((a, b) => b.rate - a.rate);
        setSortedReviews(highestRating);
      }
      if (selectedSort === 3) {
        const lowestRating = [...reviews].sort((a, b) => a.rate - b.rate);
        setSortedReviews(lowestRating);
      }
    }
  }, [reviews, selectedSort]);

  const handleChangeSort = (e) => {
    setSelectedSort(e.target.value);
  };

  return (
    <Paper elevation={0} className={classes.wrapper}>
      <Grid container>
        <Grid item container className={classes.innerWrapper}>
          <Box className={classes.titleWrapper}>
            <Typography variant="h2" className={classes.title}>
              Reviews
            </Typography>

            {reviews && (
              <Typography variant="body2">{reviews?.length} reviews</Typography>
            )}
          </Box>

          <Box className={classes.buttonSelectWrapper}>
            <FormControl className={classes.formControl}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={selectedSort}
                label="Sort by"
                defaultValue={1}
                onChange={handleChangeSort}
                className={classes.select}
              >
                <MenuItem value={1}>Most recent first</MenuItem>
                <MenuItem value={2}>Top-rated first</MenuItem>
                <MenuItem value={3}>Lowest rated first</MenuItem>
              </Select>
            </FormControl>

            <CreateReviewDialog />
          </Box>
        </Grid>

        <Divider variant="middle" className={classes.divider} />

        {loading ? (
          <Loading />
        ) : reviews && reviews.length > 0 && sortedReviews ? (
          <HotelReviewsPagination reviews={sortedReviews} />
        ) : (
          <Typography>There are no reviews yet. Be the first one!</Typography>
        )}
      </Grid>
    </Paper>
  );
};
