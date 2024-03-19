import { makeStyles } from "tss-react/mui";

export const useAdminPanelStyles = makeStyles()((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    marginBottom: theme.spacing(3),
  },
  row: {
    maxHeight: "100% !important",
    width: "100% !important",
  },
  cell: {
    maxHeight: "100% !important",
    whiteSpace: "normal !important" as "normal",
    boxShadow: "none !important",
  },
  select: {
    marginTop: 0,
    marginBottom: 0,
  },
  selectDisabled: {
    "& > div": {
      border: `2px solid ${theme.palette.error.light}`,
    },
  },
  saveButton: {},

  header: {
    "& *": {
      fontWeight: "bolder !important",
      "& *": {
        fontWeight: "bolder !important",
      },
    },
  },
}));
