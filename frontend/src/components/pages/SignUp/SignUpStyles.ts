import { makeStyles } from "tss-react/mui";

export const useSignUpStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.light,
    height: "150vh",
    flex: 1,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }
}));
