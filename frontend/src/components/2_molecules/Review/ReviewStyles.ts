import { makeStyles } from "tss-react/mui";

export const useReviewStyles = makeStyles()((theme) => ({
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
  typography: {
    fontWeight: theme.typography.fontWeightBold,
  },
  dateNameWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    width: "100%",
    margin: theme.spacing(1.5, 0, 0.5, 0),
  },
  review: {
    wordBreak: "break-word",
    color: theme.palette.primary.light,
  },
  buttonsWrapper: {
    display: "flex",
    columnGap: theme.spacing(0.5),
    rowGap: theme.spacing(0.5),
    marginTop: theme.spacing(1.5),
  },
  infoIcon: {
    height: 14,
    width: "fit-content",
    marginBottom: theme.spacing(0.2),
  },
  rateInfoWrapper: {
    display: "flex",
    flexDirection: "row",
  },
}));
