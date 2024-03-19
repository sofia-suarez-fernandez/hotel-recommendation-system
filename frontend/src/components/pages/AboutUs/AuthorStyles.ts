import { makeStyles } from "tss-react/mui";

export const useAuthorStyles = makeStyles()((theme) => ({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.light,
    height: "100vh",
    flex: 1,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    flex: 1,
  }
}));
