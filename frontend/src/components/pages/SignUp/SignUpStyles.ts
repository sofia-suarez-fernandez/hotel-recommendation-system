import { makeStyles } from "tss-react/mui";

export const useSignUpStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.light,
    paddingTop: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      backgroundColor: theme.palette.background.default,
    },
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.light,
    flex: 1,
    [theme.breakpoints.only("xs")]: {
      display: "none",
    }
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
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
