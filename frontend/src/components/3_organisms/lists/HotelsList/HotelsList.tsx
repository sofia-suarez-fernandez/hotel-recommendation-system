import { Grid } from "@mui/material";
import { Hotel } from "../../../../interfaces/hotel";
import { HotelCard } from "../../../2_molecules/HotelCard/HotelCard";
import { HotelsListProps } from "./HotelsListInterfaces";
import { useHotelsListStyles } from "./HotelsListStyle";
import { useEffect, useState } from "react";

export const HotelsList = ({
  hotels,
  itemOffset,
}: HotelsListProps): JSX.Element => {
  const { classes } = useHotelsListStyles();
  const [loadedIndex, setLoadedIndex] = useState(0);

  useEffect(() => {
    if (loadedIndex < hotels.length) {
      const timer = setTimeout(() => {
        setLoadedIndex(loadedIndex + 1);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [loadedIndex, hotels.length]);

  return (
    <Grid container className={classes.wrapper}>
      {hotels.slice(0, loadedIndex + 1).map((hotel: Hotel, id) => (
        <HotelCard
          key={hotel.hotel_name}
          hotel={hotel}
          rankingNumber={itemOffset + 1 + id}
        />
      ))}
    </Grid>
  );
};
