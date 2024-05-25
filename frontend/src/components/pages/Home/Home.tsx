import {
  FormControl,
  Grid,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import useCountryCity from "../../../hooks/services/hotel/useCityNames";
import { Hotel } from "../../../interfaces/hotel";
// import {
//   getPopularHotels,
//   getRecommendedHotelsByUserId,
// } from "../../../services/recommendations";
import { getPopularHotels } from "../../../services/recommendations";
import { Section } from "../../1_atoms/Section/Section";
import { HotelsPagination } from "../../3_organisms/sections/HotelsPagination/HotelsPagination";
import Layout from "../../4_templates/Layout/Layout";
import { Admin } from "../Admin/Admin";
import { useHomeStyles } from "./HomeStyles";

export const Home = (): JSX.Element => {
  const { classes } = useHomeStyles();

  const userId = useSelector((state: RootState) => state.user.user?.id);
  const isAdmin = useSelector((state: RootState) => state.user.user?.is_staff);
  const user = useSelector((state: RootState) => state.user.user);

  const [recommendedHotels, setRecommendedHotels] = useState<Hotel[]>([]);
  const [popularHotels, setPopularHotels] = useState<Hotel[]>([]);

  const { response, loading } = useCountryCity();

  const [selectedCity, setSelectedCity] = useState("Everywhere");

  const handleChangeCity = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {}, [userId, isAdmin]);

  // Recommended hotels
  useEffect(() => {
    getPopularHotels(selectedCity)
      .then((hotels) => {
        setPopularHotels(hotels);
      })
      .catch((error) => {
        console.error("Error fetching popular hotels: ", error);
      });
  }, [selectedCity]);
  // useEffect(() => {
  //   getPopularHotels(selectedCity).then((hotels) => {
  //     setPopularHotels(hotels);
  //   });
  //   userId &&
  //     getRecommendedHotelsByUserId(selectedCity, userId).then((hotels) => {
  //       setRecommendedHotels(hotels);
  //     });
  // }, [selectedCity , userId]);

  // Popular or recommended hotels
  const hotels: Hotel[] | undefined = useMemo(
    () => (recommendedHotels.length < 1 ? popularHotels : recommendedHotels),
    [popularHotels, recommendedHotels]
  );

  const countries =
    loading === false &&
    Array.isArray(response) &&
    response
      .map((item) => item?.country)
      .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <Layout isGreyBackground>
      {isAdmin === true ? (
        // Admin
        <Admin />
      ) : user === null || isAdmin === false ? (
        // Hotels page
        <Section marginBottom={false}>
          <Grid container className={classes.titleWrapper}>
            <Typography
              variant="h1"
              textAlign="center"
              className={classes.title}
            >
              Where will you go next?
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selectedCity}
                defaultValue="Everywhere"
                id="grouped-select"
                onChange={handleChangeCity}
                className={classes.select}
              >
                <MenuItem value="Everywhere">Everywhere</MenuItem>∑
                {loading === false && (
                  <ListSubheader className={classes.listSubHeader}>
                    {countries[0]}
                  </ListSubheader>
                )}
                {loading === false &&
                  response &&
                  response.map((data) => {
                    return (
                      <MenuItem
                        // key={data.city}
                        key={data.locality}
                        // value={data.city}
                        value={data.locality}
                        style={{ paddingLeft: "2rem" }}
                      >
                        {/* {data.city} */}
                        {data.locality}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>

          {hotels && <HotelsPagination hotels={hotels} />}
        </Section>
      ) : (
        <></>
      )}
    </Layout>
  );
};
