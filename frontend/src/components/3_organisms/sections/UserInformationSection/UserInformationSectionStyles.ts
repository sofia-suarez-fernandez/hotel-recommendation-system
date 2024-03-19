import { makeStyles } from "tss-react/mui";

export const useUserInformationSectionStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  personalInfoField: {
    columnGap: theme.spacing(1),
  },
  title: {
    margin: 0,
  },
  usernameWrapper: {
    marginTop: theme.spacing(1.5),
  },
  username: {
    fontWeight: theme.typography.fontWeightBold,
  },
  divider: {
    width: "100%",
    margin: theme.spacing(1.5, 0, 0.5, 0),
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1)
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.primary.main,
  },
}));
