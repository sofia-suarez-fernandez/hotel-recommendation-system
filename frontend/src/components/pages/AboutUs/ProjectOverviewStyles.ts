import { makeStyles } from "tss-react/mui";

export const useProjectOverviewStyles = makeStyles()((theme) => ({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    height: "100vh",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      width: "100vw",
      paddingTop: theme.spacing(4),
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
      maxHeight: "25%",
      flex: 1,
    }
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingRight: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      justifyContent: "flex-start",
      maxHeight: "75%",
      width: "100%",
      padding: theme.spacing(2),
      paddingTop: theme.spacing(4),
    }
  },
  icon: {
    fontSize: "5rem",
    color: theme.palette.primary.dark,
  },
}));
