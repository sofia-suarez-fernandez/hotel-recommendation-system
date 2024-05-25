import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useHotelSlug from "../../../hooks/useHotelSlug";
import useRupeeToEuros from "../../../hooks/useRupeeToEuros";
import { RatingNumber } from "../../1_atoms/RatingNumber/RatingNumber";
import { HotelCardProps } from "./HotelCardInterfaces";
import { useHotelCardStyles } from "./HotelCardStyles";
import { LocationOn } from "@mui/icons-material";

export const HotelCard = ({
  hotel,
  rankingNumber,
}: HotelCardProps): JSX.Element => {
  const { classes } = useHotelCardStyles();

  const hotelSlug = useHotelSlug(hotel.id, hotel.hotel_name);
  const urlHotel = `/hotel/${hotelSlug}`;
  const urlHotelReviews = `/hotel/${hotelSlug}#reviews`;

  // const imagesArray =
  //   hotel.images &&
  //   hotel.images !== null &&
  //   hotel.images.replace("{", "").replace("}", "").split(",");
  const imageURL = hotel.hotel_image;

  // const priceEuros = useRupeeToEuros(hotel.price);
  const priceRange = hotel.price_range?.replace(/[^$]/g, "") ?? "";

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
                <Typography variant="body2" className={classes.hotelCity}>
                  <LocationOn className={classes.icon} />
                  {hotel.locality}
                  {", "}
                  {hotel.country}
                </Typography>
              )}
            </Box>

            {hotel.price_range && (
              <Typography variant="body2">
                {/* From <b>{priceEuros}€</b> */}
                <b>{priceRange}</b>
              </Typography>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.reviewsWrapper}>
        <Box className={classes.reviewsInfoWrapper}>
          <RatingNumber rating={hotel.rating_value} />

          {hotel.review_count && (
            <Typography variant="body2" className={classes.numberOfReviews}>
              {hotel.review_count} reviews
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          href={urlHotelReviews}
          className={classes.button}
        >
          <Typography style={{ color: "white" }}>See reviews</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};
