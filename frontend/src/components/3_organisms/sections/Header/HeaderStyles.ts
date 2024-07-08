import { makeStyles } from "tss-react/mui";
import { headerHeight } from "../../../../helpers/constants";

export const useHeaderStyles = makeStyles()((theme) => ({
  wrapper: {
    height: `${headerHeight}px`,
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
  },
  innerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 0",
  },
  typography: {
    margin: 0,
  },
  navItemsWrapper: {
    gap: theme.spacing(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));
