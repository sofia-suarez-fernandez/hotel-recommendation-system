import { makeStyles } from "tss-react/mui";

export const useHomeStyles = makeStyles()((theme) => ({
  titleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(1.5),
  },
  title: {
    marginBottom: 0,
    color: theme.palette.text.primary,
  },
  listSubHeader: {
    color: theme.palette.grey[400],
    fontWeight: theme.typography.fontWeightBold,
  },
  select: {
    "& div": {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
    },
  },
  selectLabel: {
    color: theme.palette.text.primary,    
  }
}));
