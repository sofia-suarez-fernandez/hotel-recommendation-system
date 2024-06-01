import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { /*GoogleMap, MarkerF,*/ useLoadScript } from "@react-google-maps/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import { Loading } from "../../../1_atoms/Loading";
import { RatingNumber } from "../../../1_atoms/RatingNumber/RatingNumber";
import { HotelHeroProps } from "./HotelHeroInterfaces";
import { useHotelHeroStyles } from "./HotelHeroStyles";
import useHotelSlug from "../../../../hooks/useHotelSlug";

export const HotelHero = ({
  hotel,
  amenities,
}: HotelHeroProps): JSX.Element => {
  const { classes } = useHotelHeroStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const hotelSlug = useHotelSlug(hotel?.hotel_name ?? "");

  const image = hotel?.hotel_image;

  const hotelImages = [
    {
      img: image ? image : undefined,
      title: "Hotel first image",
      rows: 2,
      cols: 2,
    },
    {
      img: image ? image : undefined,
      title: "Hotel second image",
      rows: 1,
    },
    {
      img: image ? image : undefined,
      title: "Hotel third image",
      rows: 1,
    },
  ];

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const address = hotel?.street_address ? hotel.street_address : "";
  const city = hotel?.locality ? hotel.locality : "";
  const country = hotel?.country ? hotel.country : "";
  const description = hotel?.hotel_description ? hotel.hotel_description : "";
  const amenitiesList = amenities ? amenities : {};
  const priceRange = hotel?.price_range?.replace(/[^$]/g, "") ?? "";

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

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  // });

  return (
    <Grid container className={classes.wrapper}>
      <Box className={classes.ratingTitleWrapper}>
        <Typography variant="h1" className={classes.title}>
          {hotel?.hotel_name}
        </Typography>
        <Box className={classes.ratingTextWrapper}>
          <Typography variant="h5" className={classes.ratingText}>
            {ratingText}
          </Typography>
          <RatingNumber rating={hotel?.rating_value} />
        </Box>
      </Box>

      <Box className={classes.location}>
        <Box className={classes.locationName}>
          <LocationOnIcon fontSize="small" className={classes.locationIcon} />

          <Typography variant="body1">
            {address}, {city}, {country}
          </Typography>

          <Typography
            variant="body1"
            component="a"
            href={`https://www.google.com/maps?q=@${hotelSlug}`}
            className={classes.showOnMap}
            target="_blank"
            rel="noopener noreferrer"
          >
            Show on map
          </Typography>
        </Box>

        {priceRange && (
          <Box className={classes.priceInfoWrapper}>
            <Tooltip title="Based on Average Nightly Rates for a Standard Room from our Partners.">
              <Typography variant="h4" className={classes.priceRange}>
                <b>{priceRange}</b>{" "}
                <InfoOutlined className={classes.infoIcon} />
              </Typography>
            </Tooltip>
          </Box>
        )}
      </Box>

      <ImageList
        variant="quilted"
        cols={isMobile ? 2 : 3}
        gap={10}
        className={classes.imageList}
      >
        {hotelImages.map((item, index) => (
          <ImageListItem
            key={index}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            {item.img ? (
              <LazyLoadImage
                {...srcset(item.img, 121, item.rows, item.cols)}
                height="100%"
                width="100%"
                effect="blur"
                className={classes.image}
              />
            ) : (
              <LazyLoadImage
                src={require("../../../../static/images/no-image-found.jpeg")}
                height="100%"
                width="100%"
                effect="blur"
                className={classes.image}
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1" className={classes.accordionSummary}>
            Description
          </Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.accordionDetails}>
          <Typography variant="body1">{description}</Typography>
        </AccordionDetails>
      </Accordion>

      <Box mb={1}></Box>

      {amenitiesList && Object.keys(amenitiesList).length > 0 && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="body1" className={classes.accordionSummary}>
              Amenities
            </Typography>
          </AccordionSummary>

          <AccordionDetails className={classes.accordionDetails}>
            <Grid container columnSpacing={1}>
              {Object.entries(amenitiesList[0]).map(([key, value]) => {
                if (value === true) {
                  let formattedKey = key.replace(/_/g, " ");
                  formattedKey =
                    key.replace(/_/g, " ").charAt(0).toUpperCase() +
                    formattedKey.slice(1);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Typography variant="body2">{formattedKey}</Typography>
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* -------------------------------- MAP -------------------------------- */}
      {/* <Accordion className={classes.accordionMap}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">Location</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {!isLoaded ? (
            <Loading />
          ) : (
            hotel?.latitude &&
            hotel.longitude && (
              <GoogleMap
                zoom={13}
                center={{ lat: hotel?.latitude, lng: hotel?.longitude }}
                mapContainerClassName={classes.map}
              >
                <MarkerF
                  position={{ lat: hotel?.latitude, lng: hotel?.longitude }}
                />
              </GoogleMap>
            )
          )}
        </AccordionDetails>
      </Accordion> */}
    </Grid>
  );
};
