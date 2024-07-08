import { Avatar, Divider, Box, Grid, Paper, Typography } from "@mui/material";
import { Section } from "../../../1_atoms/Section/Section";
import { UserInformationSectionProps } from "./UserInformationSectionInterfaces";
import { useUserInformationSectionStyles } from "./UserInformationSectionStyles";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQuery, useTheme } from "@mui/material";

export const UserInformationSection = ({
  firstName,
  lastName,
  username,
  email,
}: UserInformationSectionProps): JSX.Element => {
  const { classes } = useUserInformationSectionStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Section marginBottom={false}>
      <Paper className={classes.wrapper}>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <PersonIcon />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h2" className={classes.title}>
              My personal information
            </Typography>
          </Grid>
        </Grid>

        <Divider variant="middle" className={classes.divider} />

        <Grid container spacing={2}>
          {isMobile === false && (
            <Grid item xs={1} className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>{firstName?.charAt(0)}</Avatar>
            </Grid>
          )}
          <Grid item xs={11} className={classes.info}>
            <Box>
              <Grid container className={classes.personalInfoField}>
                <Typography variant="body2">Username:</Typography>
                <Typography className={classes.fields}>{username}</Typography>
              </Grid>
              {email && (
                <Grid container className={classes.personalInfoField}>
                  <Typography variant="body2">Email: </Typography>
                  <Typography className={classes.fields}>{email}</Typography>
                </Grid>
              )}
            </Box>
            <Box>
              {firstName && (
                <Grid container className={classes.personalInfoField}>
                  <Typography variant="body2">First name: </Typography>{" "}
                  <Typography className={classes.fields}>{firstName}</Typography>
                </Grid>
              )}
              {lastName && (
                <Grid container className={classes.personalInfoField}>
                  <Typography variant="body2">Last name: </Typography>
                  <Typography className={classes.fields}>{lastName}</Typography>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Section>
  );
};
