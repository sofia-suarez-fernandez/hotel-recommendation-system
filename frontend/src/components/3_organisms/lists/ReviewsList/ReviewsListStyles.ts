import { makeStyles } from "tss-react/mui";

export const useReviewsListStyles = makeStyles()((theme) => ({
  wrapper: {
    rowGap: theme.spacing(1),
  },
  innerWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      justifyContent: "space-between",
    },
  },
}));
