import { Grid } from "@mui/material";
import { Hotel } from "../../../../interfaces/hotel";
import { HotelCard } from "../../../2_molecules/HotelCard/HotelCard";
import { HotelsListProps } from "./HotelsListInterfaces";
import { useHotelsListStyles } from "./HotelsListStyle";

export const HotelsList = ({
  hotels,
  itemOffset,
}: HotelsListProps): JSX.Element => {
  const { classes } = useHotelsListStyles();

  return (
    <Grid container className={classes.wrapper}>
      {hotels.map((hotel: Hotel, id) => (
        <HotelCard
          key={hotel.hotel_name}
          hotel={hotel}
          rankingNumber={itemOffset + 1 + id}
        />
      ))}
    </Grid>
  );
};
