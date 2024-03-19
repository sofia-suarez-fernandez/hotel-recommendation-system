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

  const hotelSlug = useHotelSlug(hotel.id, hotel.name);
  const urlHotel = `/hotel/${hotelSlug}`;
  const urlHotelReviews = `/hotel/${hotelSlug}#reviews`;

  const imagesArray =
    hotel.images &&
    hotel.images !== null &&
    hotel.images.replace("{", "").replace("}", "").split(",");

  const priceEuros = useRupeeToEuros(hotel.price);

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
              imagesArray
                ? imagesArray[0]
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
                {hotel.name}
              </Typography>

              {hotel.city && hotel.country && (
                <Typography variant="body2" className={classes.hotelCity}>
                  <LocationOn className={classes.icon} />
                  {hotel.city}
                  {", "}
                  {hotel.country}
                </Typography>
              )}
            </Box>

            {hotel.price && (
              <Typography variant="body2">
                From <b>{priceEuros}€</b>
              </Typography>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.reviewsWrapper}>
        <Box className={classes.reviewsInfoWrapper}>
          <RatingNumber rating={hotel.rating?.rating__avg} />

          {hotel.num_reviews && (
            <Typography variant="body2" className={classes.numberOfReviews}>
              {hotel.num_reviews} reviews
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
