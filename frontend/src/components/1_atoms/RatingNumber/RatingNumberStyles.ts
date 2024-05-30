import { makeStyles } from "tss-react/mui";

export const useRatingNumberStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingTop: theme.spacing(0.2),
    paddingBottom: theme.spacing(0.2),
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: theme.shape.borderRadius,
  },
  rating: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
  },
}));
