import { makeStyles } from "tss-react/mui";

export const useLayoutStyles = makeStyles<{ isGreyBackground?: boolean }>()(
  (theme, { isGreyBackground }) => ({
    wrapper: {
      marginTop: theme.spacing(0),
      minHeight: "100vh",
      backgroundColor: isGreyBackground
        ? theme.palette.grey[200]
        : theme.palette.background.paper,
    },
  })
);
