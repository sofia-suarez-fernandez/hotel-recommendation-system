import { makeStyles } from "tss-react/mui";

export const useHotelCardStyles = makeStyles()((theme) => ({
  card: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    width: "100%",
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  cardActionArea: {
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  cardMedia: {
    width: "50%",
    height: "100%",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
      height: "200px",
      width: "100%",
    },
  },
  image: {
    backgroundPosition: "center",
    objectFit: "cover",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    columnGap: theme.spacing(0.5),
    [theme.breakpoints.only("xs")]: {
      padding: 0,
    },
  },
  cardInnerContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      rowGap: theme.spacing(1),
    },
  },
  hotelNumber: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
  infoWrapper: {
    flexDirection: "column",
    rowGap: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(0.5),
      rowGap: theme.spacing(0.5),
    },
  },
  titleAndRating: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    columnGap: theme.spacing(1),
  },
  reviewsWrapper: {
    padding: 0,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    rowGap: theme.spacing(1),
    justifyContent: "space-between",
    [theme.breakpoints.only("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.only("xs")]: {
      alignItems: "center",
      flexDirection: "row",
      columnGap: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(0.5),
    },
  },
  reviewsInfoWrapper: {
    paddingTop: theme.spacing(1.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    rowGap: theme.spacing(0.2),
    [theme.breakpoints.only("sm")]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.only("xs")]: {
      alignItems: "center",
      flexDirection: "row",
      columnGap: theme.spacing(0.5),
      paddingTop: 0,
    },
  },
  numberOfReviews: {
    textAlign: "right",
    [theme.breakpoints.only("xs")]: {
      textAlign: "left",
      lineHeight: 1,
    },
  },
  titleAndCity: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(0.2),
  },
  title: {
    fontWeight: "bold",
    marginBottom: 0,
    color: theme.palette.text.primary,
  },
  button: {
    width: "fit-content",
    marginBottom: theme.spacing(1.5),
    whiteSpace: "nowrap",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.only("sm")]: {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    }
  },
  hotelCity: {
    alignItems: "center",
    display: "flex",
  },
  icon: {
    height: 18,
  }
}));
