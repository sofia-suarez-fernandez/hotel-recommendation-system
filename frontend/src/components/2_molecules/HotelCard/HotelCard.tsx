import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useHotelSlug from "../../../hooks/useHotelSlug";
import { RatingNumber } from "../../1_atoms/RatingNumber/RatingNumber";
import { HotelCardProps } from "./HotelCardInterfaces";
import { useHotelCardStyles } from "./HotelCardStyles";
import { LocationOn } from "@mui/icons-material";

export const HotelCard = ({
  hotel,
  rankingNumber,
}: HotelCardProps): JSX.Element => {
  const { classes } = useHotelCardStyles();

  // const hotelSlug = useHotelSlug(hotel.id, hotel.hotel_name);
  const hotelSlug = useHotelSlug(hotel.hotel_name);
  const urlHotel = `/hotel/${hotelSlug}`;
  const urlHotelReviews = `/hotel/${hotelSlug}#reviews`;

  const imageURL = hotel.hotel_image;

  const priceRange = hotel.price_range?.replace(/[^$]/g, "") ?? "";

  let ratingText = "";
  if (hotel && hotel.rating_value !== undefined) {
    const ratingValueBase10 = hotel.rating_value * 2;
    if (ratingValueBase10 >= 9) {
      ratingText = "Fantastic";
    } else if (ratingValueBase10 >= 8) {
      ratingText = "Fabulous";
    } else if (ratingValueBase10 >= 7) {
      ratingText = "Good";
    } else if (ratingValueBase10 >= 6) {
      ratingText = "Pleasant";
    } else {
      ratingText = "Average";
    }
  }

  return (
    <Card className={classes.card}>
      <CardActionArea href={urlHotel} className={classes.cardActionArea}>
        <Box className={classes.cardMedia}>
          <LazyLoadImage
            alt="Hotel"
            height="100%"
            width="100%"
            effect="blur"
            src={
              imageURL
                ? imageURL
                : require("../../../static/images/no-image-found.jpeg")
            }
            className={classes.image}
          />
        </Box>

        <CardContent className={classes.cardContent}>
          <Typography variant="h2" className={classes.hotelNumber}>
            {rankingNumber}
          </Typography>

          <Grid container className={classes.infoWrapper}>
            <Box className={classes.titleAndCity}>
              <Typography variant="h2" className={classes.title}>
                {hotel.hotel_name}
              </Typography>

              {hotel.locality && hotel.country && (
                <Box>
                  <Typography variant="body2" className={classes.hotelCity}>
                    <LocationOn className={classes.icon} />
                    {hotel.locality}
                    {", "}
                    {hotel.country}
                  </Typography>

                  <Box
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      window.open(
                        `https://www.google.com/maps?q=@${hotelSlug}`,
                        "_blank"
                      );
                    }}
                    className={classes.showOnMap}
                    rel="noopener noreferrer"
                  >
                    <Typography variant="subtitle1">Show on map</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.reviewsWrapper}>
        <Box className={classes.reviewsInfoWrapper}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" className={classes.ratingText}>
              {ratingText}
            </Typography>
            <RatingNumber rating={hotel.rating_value} />
          </Box>

          {hotel.review_count && (
            <Typography variant="body2" className={classes.numberOfReviews}>
              {hotel.review_count} reviews
            </Typography>
          )}
        </Box>

        <Box>
          {hotel.price_range && (
            <Tooltip title="Based on Average Nightly Rates for a Standard Room from our Partners.">
              <Typography variant="h4" className={classes.priceRange}>
                <b>{priceRange}</b>{" "}
                <InfoOutlined className={classes.infoIcon} />
              </Typography>
            </Tooltip>
          )}
          <Button
            variant="contained"
            color="secondary"
            href={urlHotelReviews}
            className={classes.button}
          >
            <Typography style={{ color: "white" }}>See reviews</Typography>
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
