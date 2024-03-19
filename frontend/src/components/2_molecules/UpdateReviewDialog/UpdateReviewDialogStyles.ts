import { makeStyles } from "tss-react/mui";

export const useUpdateReviewDialogStyles = makeStyles()((theme) => ({
  buttonWrapper: {
    width: "fit-content",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(0.5, 0),
    },
  },
  dialog: {
    "& > div": {
      [theme.breakpoints.only("xs")]: {
        width: "100%",
      },
      "& > div": {
        [theme.breakpoints.only("xs")]: {
          width: "100%",
          margin: theme.spacing(1),
        },
      },
    },
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: `${theme.spacing(1)} !important`,
    rowGap: theme.spacing(1),
  },
  dialogActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: theme.spacing(0, 1.5, 1, 1.5),
  },
  title: {
    marginBottom: 0,
  },
  reviewWrapper: {
    marginBottom: 0,
    width: theme.spacing(25),
    [theme.breakpoints.only("xs")]: {
      width: "auto",
    },
  },
}));
