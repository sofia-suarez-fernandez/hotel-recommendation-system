import { makeStyles } from "tss-react/mui";

export const useHotelsPaginationStyles = makeStyles()((theme) => ({
  pagination: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: 0,
    paddingTop: theme.spacing(2),
    fontFamily: "Helvetica, Franklin Gothic Medium, Arial, sans-serif",
    fontSize: "0.9rem",

    "& .pageNumber, .previousPage, .nextPage": {
      color: theme.palette.text.primary,
      cursor: "pointer",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0.5, 0.75),
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.secondary,
      },
    },

    "& .previousPage, .nextPage": {
      display: "flex",
      padding: theme.spacing(0.375, 0.75),
    },

    "& .active": {
      cursor: "pointer",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0.5, 0),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
      "& .pageNumber": {
        color: theme.palette.text.secondary,
      },
    },
  },
}));
