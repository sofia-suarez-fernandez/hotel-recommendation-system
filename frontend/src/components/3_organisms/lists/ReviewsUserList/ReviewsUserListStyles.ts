import { makeStyles } from "tss-react/mui";

export const useReviewsUserListStyles = makeStyles()((theme) => ({
  reviewWrapper: {
    rowGap: theme.spacing(0.5),
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      rowGap: theme.spacing(1),
    },
    "& > div": {
      width: "100%",
    },
  },
  reviewInnerWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: theme.spacing(1),
    rowGap: theme.spacing(1.5),
    marginBottom: theme.spacing(-0.5),
  },
  buttonsWrapper: {
    display: "flex",
    columnGap: theme.spacing(0.5),
    rowGap: theme.spacing(0.5),
  },
  divider: {
    width: "100%",
    margin: theme.spacing(1.5, 0, 0.5, 0),
  },
}));
