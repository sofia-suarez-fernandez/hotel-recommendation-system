import { makeStyles } from "tss-react/mui";

export const useUserReviewsSectionStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    margin: 0,
  },
  subtitle: {
    color: theme.palette.primary.light,
  },
  divider: {
    width: "100%",
    margin: theme.spacing(1.5, 0, 1.5, 0),
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      rowGap: theme.spacing(1),
      alignItems: "flex-start",
    },
  },
  formControl: {
    marginBottom: 0,
    maxWidth: theme.spacing(10),
  },
  select: {
    "& div": {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
  },
}));
