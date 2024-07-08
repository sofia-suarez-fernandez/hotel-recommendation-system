import { makeStyles } from "tss-react/mui";

export const useAuthorStyles = makeStyles()((theme) => ({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    height: "100vh",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      width: "100vw",
      paddingTop: theme.spacing(6),
    }
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.light,
    height: "100%",
    flex: 1,
    [theme.breakpoints.only("xs")]: {
      height: "auto",
    }
  },
  rightColumn: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      width: "100%",
      padding: theme.spacing(2),
    }
  },
  authorName: {
    width: "60%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    }
  }, 
  description: {
    width: "60%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    }
  }
}));
