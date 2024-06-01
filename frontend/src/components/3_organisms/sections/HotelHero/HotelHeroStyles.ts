import { makeStyles } from "tss-react/mui";
import { menuHeight } from "../../../../helpers/constants";

export const useHotelHeroStyles = makeStyles()((theme) => ({
  wrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  ratingTitleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    columnGap: theme.spacing(0.75),
    paddingBottom: theme.spacing(1),
  },
  title: {
    marginBottom: 0,
    color: theme.palette.text.primary,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.text.primary,
  },
  locationName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.primary,
  },
  locationIcon: {
    marginRight: theme.spacing(0.5),
  },
  accordionDetails: {
    paddingTop: 0,
  },
  accordionSummary: {
    fontWeight: "bold",
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
  ratingText: {
    fontWeight: "bold",
    marginBottom: 0,
    marginRight: theme.spacing(0.5),
    color: theme.palette.secondary.main,
  },
  ratingTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing(0.3),
  },
  priceRange: {
    textAlign: "right",
    marginBottom: theme.spacing(0.2),
  },
  infoIcon: {
    height: 14,
    width: "fit-content",
    marginBottom: theme.spacing(0.2),
  },
  priceInfoWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: theme.spacing(1),
    zIndex: theme.zIndex.appBar - 1,
    height: `${menuHeight}px`,
    backgroundColor: theme.palette.background.paper,
  },
  menuItem: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
      color: theme.palette.secondary.main,
    },
    "&:active": {
      color: theme.palette.primary.main,
    },
    color: theme.palette.text.primary,
  },
  link: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  divider: {
    height: '2rem',
  }
}));
