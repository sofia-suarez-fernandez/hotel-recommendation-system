import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, Element } from "react-scroll";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Loading } from "../../../1_atoms/Loading";
import { RatingNumber } from "../../../1_atoms/RatingNumber/RatingNumber";
import { HotelHeroProps } from "./HotelHeroInterfaces";
import { useHotelHeroStyles } from "./HotelHeroStyles";
import useHotelSlug from "../../../../hooks/useHotelSlug";
// leaflet map
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const fullAddress = address + ", " + city + ", " + country;

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 5,
    address: fullAddress,
  });

  let CustomIcon = L.icon({
    iconUrl: "/images/marker-icon-2x.png",
    iconSize: [25, 30],
    iconAnchor: [12, 30],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (address) {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setViewport(() => ({
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
              zoom: 11,
              address: fullAddress,
            }));
          }
        });
    }
  }, [address, fullAddress]);

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

  const [loadedIndex, setLoadedIndex] = useState(0);

  useEffect(() => {
    if (loadedIndex < 7) {
      const timer = setTimeout(() => {
        setLoadedIndex(loadedIndex + 1);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [loadedIndex]);

  return (
    <Grid container className={classes.wrapper}>
      {loadedIndex >= 0 && (
        <Grid className={classes.menu}>
          <Link
            activeClass="active"
            to="description"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={classes.link}
          >
            <Typography variant="body1" className={classes.menuItem}>
              Description
            </Typography>
          </Link>
          <Divider orientation="vertical" className={classes.divider} />
          <Link
            activeClass="active"
            to="amenities"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={classes.link}
          >
            <Typography variant="body1" className={classes.menuItem}>
              Amenities
            </Typography>
          </Link>
          <Divider orientation="vertical" className={classes.divider} />
          <Link
            activeClass="active"
            to="reviews"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={classes.link}
          >
            <Typography variant="body1" className={classes.menuItem}>
              Reviews
            </Typography>
          </Link>
          <Divider orientation="vertical" className={classes.divider} />
          <Link
            activeClass="active"
            to="map"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className={classes.link}
          >
            <Typography variant="body1" className={classes.menuItem}>
              Map
            </Typography>
          </Link>
        </Grid>
      )}

      {loadedIndex >= 1 && (
        <Box className={classes.ratingTitleWrapper}>
          <Typography variant="h1" className={classes.title}>
            {hotel?.hotel_name}
          </Typography>
          <Box className={classes.ratingTextWrapper}>
            <Typography className={classes.ratingText}>{ratingText}</Typography>
            <RatingNumber rating={hotel?.rating_value} />
          </Box>
        </Box>
      )}

      {loadedIndex >= 2 && (
        <Box className={classes.location}>
          <Box className={classes.locationNameWrapper}>
            <Box className={classes.locationName}>
              <LocationOnIcon
                fontSize="small"
                className={classes.locationIcon}
              />

              <Typography variant="body1">
                {address}, {city}, {country}
              </Typography>
            </Box>

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
                <Typography className={classes.priceRange}>
                  <b>{priceRange}</b>{" "}
                  <InfoOutlined className={classes.infoIcon} />
                </Typography>
              </Tooltip>
            </Box>
          )}
        </Box>
      )}

      {loadedIndex >= 3 && (
        <ImageList
          variant="quilted"
          cols={isMobile ? 2 : 3}
          gap={10}
          className={classes.imageList}
        >
          {hotelImages.map((item, index) => (
            <ImageListItem
              key={index}
              cols={item.cols !== undefined ? item.cols : 1}
              rows={item.rows || 1}
            >
              {item.img ? (
                <LazyLoadImage
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  height="100%"
                  width="100%"
                  alt={item.title}
                  effect="blur"
                  rel="preload"
                  debounce={300}
                  threshold={200}
                  placeholderSrc={require("../../../../static/images/no-image-found.jpeg")}
                  className={classes.image}
                />
              ) : (
                <LazyLoadImage
                  src={require("../../../../static/images/no-image-found.jpeg")}
                  height="100%"
                  width="100%"
                  alt="Image Title"
                  effect="blur"
                  className={classes.image}
                />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {loadedIndex >= 4 && (
        <Element name="description">
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
        </Element>
      )}

      <Box mb={1}></Box>

      {amenitiesList &&
        Object.keys(amenitiesList).length > 0 &&
        loadedIndex >= 5 && (
          <Element name="amenities">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  variant="body1"
                  className={classes.accordionSummary}
                >
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
                          <Typography variant="body2">
                            {formattedKey}
                          </Typography>
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Element>
        )}

      <Box mb={1}></Box>

      {loadedIndex >= 6 && (
        <Element name="map">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="body1" className={classes.accordionSummary}>
                Map
              </Typography>
            </AccordionSummary>

            <AccordionDetails className={classes.accordionDetailsMap}>
              {viewport && viewport.latitude && viewport.longitude ? (
                <MapContainer
                  style={{ height: "400px", width: "100%" }}
                  center={[viewport.latitude, viewport.longitude]}
                  zoom={viewport.zoom}
                  attributionControl={true}
                  zoomControl={true}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {viewport && viewport.latitude && viewport.longitude && (
                    <Marker
                      position={[viewport.latitude, viewport.longitude]}
                      icon={CustomIcon}
                    >
                      <Popup>
                        <Typography variant="body2">{address}</Typography>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              ) : (
                <Loading></Loading>
              )}
            </AccordionDetails>
          </Accordion>
        </Element>
      )}
    </Grid>
  );
};
