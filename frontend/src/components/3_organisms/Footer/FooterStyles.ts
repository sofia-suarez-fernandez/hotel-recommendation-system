import { makeStyles } from "tss-react/mui";

export const useFooterStyles = makeStyles()((theme) => ({
  wrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    position: "sticky",
    top: "100%",
  },
  footerTitle: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    "& li": {
      margin: 0,
      padding: 0,
      lineHeight: 1.5,
      "& a": {
        color: theme.palette.text.secondary,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }
    }
  },
  home: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    }
  }
}));
