import { makeStyles } from "tss-react/mui";

export const useHotelReviewsSectionStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  innerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      rowGap: theme.spacing(1),
    },
  },
  reviewWrapper: {
    rowGap: theme.spacing(1),
  },
  reviewInnerWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      justifyContent: "space-between",
    },
  },
  divider: {
    width: "100%",
    margin: theme.spacing(1, 0, 1, 0),
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: 0,
  },
  buttonSelectWrapper: {
    display: "flex",
    columnGap: theme.spacing(1),
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      justifyContent: "space-between",
      rowGap: theme.spacing(0.5),
      flexWrap: "wrap",
    },
  },
  formControl: {
    marginBottom: 0,
  },
  select: {
    "& div": {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
  },
}));
