import { makeStyles } from "tss-react/mui";

export const useHotelHeroStyles = makeStyles()((theme) => ({
  wrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  ratingTitleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: theme.spacing(0.75),
    paddingBottom: theme.spacing(1),
  },
  title: {
    marginBottom: 0,
    color: theme.palette.text.primary,
  },
  location: {
    display: "flex",
    alignItems: "flex-start",
    color: theme.palette.text.primary,
  },
  locationIcon: {
    marginRight: theme.spacing(0.5),
  },
  accordionDetails: {
    paddingTop: 0,
  },
  accordionMap: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  map: {
    width: "100%",
    height: "400px",
  },
  imageList: {
    overflow: "hidden",
  },
  image: {
    backgroundPosition: "center",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
  },
  showOnMap: {
    color: theme.palette.secondary.main,
    marginLeft: theme.spacing(0.5),
    fontWeight: "bold",
  },
}));
