import { makeStyles } from "tss-react/mui";

export const useSignInFormStyles = makeStyles()((theme) => ({
  wrapper: {
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "75%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  alert: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(-1),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));
