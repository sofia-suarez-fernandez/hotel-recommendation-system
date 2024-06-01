import { makeStyles } from "tss-react/mui";

export const useReviewUserStyles = makeStyles()((theme) => ({
  wrapper: {
    flexDirection: "column",
    rowGap: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      rowGap: theme.spacing(0.5),
    },
  },
  infoWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    columnGap: theme.spacing(1),

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      rowGap: theme.spacing(1),
    },
  },
  avatarInfoWrapper: {
    columnGap: theme.spacing(1),
    display: "flex",
  },
  hotelName: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.light,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  date: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.light,
  },
  dateNameWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  review: {
    wordBreak: "break-word",
  },
}));
