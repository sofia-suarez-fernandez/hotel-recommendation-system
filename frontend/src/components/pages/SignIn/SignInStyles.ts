import { makeStyles } from "tss-react/mui";

export const useSignInStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      paddingTop: theme.spacing(8),
    },
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.light,
    height: "100vh",
    flex: 1,
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flex: 1,
    [theme.breakpoints.only("xs")]: {
      height: "auto",
    }
  },
  icon: {
    fontSize: "5rem",
    color: theme.palette.primary.dark,
  },
}));
