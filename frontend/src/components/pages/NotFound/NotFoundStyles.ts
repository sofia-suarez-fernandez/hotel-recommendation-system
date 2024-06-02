import { makeStyles } from "tss-react/mui";

export const useNotFoundStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "100vh",
    maxWidth: "660px",
    margin: "0 auto",
    gap: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      paddingTop: theme.spacing(10), 
      paddingBottom: theme.spacing(3), 
      justifyContent: "center",
      minHeight: "unset",
    }
  },
  textContainer: {
    textAlign: "left",
  },
  title: {
    fontSize: `${theme.spacing(7)} !important`,
    margin: 0,
    color: theme.palette.secondary.main,
  },
  message: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  button: {
    color: theme.palette.text.secondary,
  }
}));

