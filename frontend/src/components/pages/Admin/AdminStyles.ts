import { makeStyles } from "tss-react/mui";

export const useAdminStyles = makeStyles()((theme) => ({
  wrapper: {
    paddingTop: theme.spacing(8),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(6.5),
    },
  },
  adminPanelWrapper: {
    maxWidth: "1800px !important",
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1),
      paddingTop: 0,
    },
  },
}));
