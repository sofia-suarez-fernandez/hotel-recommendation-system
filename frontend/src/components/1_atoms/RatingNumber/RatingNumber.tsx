import { Box, Typography } from "@mui/material";
import useRatingBase10 from "../../../hooks/useRatingBase10";
import { RatingNumberProps } from "./RatingNumberInterfaces";
import { useRatingNumberStyles } from "./RatingNumberStyles";

export const RatingNumber = ({ rating }: RatingNumberProps): JSX.Element => {
  const { classes } = useRatingNumberStyles();

  const hotelRatingBase10 = useRatingBase10(rating);

  return (
    <Box className={classes.wrapper}>
      {rating && (
        <Typography variant="body1" className={classes.rating}>
          {hotelRatingBase10}
        </Typography>
      )}
    </Box>
  );
};
