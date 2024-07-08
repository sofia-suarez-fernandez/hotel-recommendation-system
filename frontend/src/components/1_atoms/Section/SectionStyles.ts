import { makeStyles } from "tss-react/mui";
import { headerHeight } from "../../../helpers/constants";

export const useSectionStyles = makeStyles<{
  paddingTop?: boolean;
  paddingBottom?: boolean;
  marginBottom?: boolean;
  isHeroSection?: boolean;
}>()((theme, { paddingTop, paddingBottom, marginBottom, isHeroSection }) => ({
  background: {
    backgroundColor: isHeroSection
      ? theme.palette.background.paper
      : "transparent",
  },
  wrapper: {
    paddingTop:
      paddingTop === false
        ? 0
        : `calc(${headerHeight}px + ${theme.spacing(isHeroSection ? 1 : 3)})`,
    marginBottom: marginBottom === false ? 0 : theme.spacing(3),
    paddingBottom: paddingBottom === false ? 0 : theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop:
        paddingTop === false
          ? 0
          : `calc(${headerHeight}px + ${theme.spacing(isHeroSection ? 1 : 2)})`,
      marginBottom: marginBottom === false ? 0 : theme.spacing(2),
      paddingBottom: paddingBottom === false ? 0 : theme.spacing(2),
    },
  },
}));
