import { makeStyles } from "tss-react/mui";

export const useSignUpFormStyles = makeStyles()((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
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
  nameWrapper: {
    columnGap: theme.spacing(1),
    "> *": {
      width: "calc(50% - 0.5rem)",
    },
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));
