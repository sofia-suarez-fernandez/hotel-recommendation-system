import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import useSortReviewsLatestFirst from "../../../../hooks/useSortReviewsLatestFirst";
import { Review } from "../../../../interfaces/review";
import { Section } from "../../../1_atoms/Section/Section";
import { UserReviewsPagination } from "../UserReviewsPagination/UserReviewsPagination";
import { UserReviewsSectionProps } from "./UserReviewsSectionInterfaces";
import { useUserReviewsSectionStyles } from "./UserReviewsSectionStyles";
import Reviews from "@mui/icons-material/Reviews";

export const UserReviewsSection = ({
  reviews,
}: UserReviewsSectionProps): JSX.Element => {
  const { classes } = useUserReviewsSectionStyles();

  const [selectedSort, setSelectedSort] = useState<number>(1);
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);

  const [latestFirst, setLatestFirst] = useState<Review[]>([]);
  const defaultReviews = useSortReviewsLatestFirst(reviews);

  useEffect(() => {
    setLatestFirst(defaultReviews);

    if (reviews) {
      setSortedReviews(latestFirst);

      if (selectedSort === 1) {
        setSortedReviews(latestFirst);
      }
      if (selectedSort === 2) {
        const highestRating = [...reviews].sort((a, b) => a.rate - b.rate);
        setSortedReviews(highestRating);
      }
      if (selectedSort === 3) {
        const lowestRating = [...reviews].sort((a, b) => b.rate - a.rate);
        setSortedReviews(lowestRating);
      }
    }
  }, [defaultReviews, latestFirst, reviews, selectedSort]);

  const handleChangeSort = (e) => {
    setSelectedSort(e.target.value);
  };

  return (
    <Section paddingTop={false} marginBottom={false}>
      <Paper className={classes.wrapper}>
        <Box className={classes.header}>
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <Reviews></Reviews>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h2" className={classes.title}>
                My reviews
              </Typography>

              <Typography variant="body2">{reviews?.length} reviews</Typography>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>Order by</InputLabel>
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
          </Grid>
        </Box>

        <Divider variant="middle" className={classes.divider} />

        {reviews && reviews.length > 0 && sortedReviews ? (
          <UserReviewsPagination reviews={sortedReviews} />
        ) : (
          <Typography>Share your experience with others!</Typography>
        )}
      </Paper>
    </Section>
  );
};
