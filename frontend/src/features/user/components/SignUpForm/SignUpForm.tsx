import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useSignUpFormStyles } from "./SignUpFormStyles";
import { useSignUpFormViewModel } from "./SignUpFormViewModel";

export const SignUpForm = (): JSX.Element => {
  const { onChange, onSubmit, isAccountCreated } = useSignUpFormViewModel();
  const { classes } = useSignUpFormStyles();

  const error = useSelector((state: RootState) => state.user.error);

  const usernameError =
    error !== null && error.username !== null && error.username !== undefined
      ? error.username[0]
      : null;
  const emailError =
    error !== null && error.email !== null && error.email !== undefined
      ? error.email[0]
      : null;
  const passwordError =
    error !== null && error.password !== null && error.password !== undefined
      ? error.password[0]
      : null;
  const rePasswordError =
    error !== null &&
    error.re_password !== null &&
    error.re_password !== undefined
      ? error.re_password[0]
      : null;
  const nonFieldError =
    error !== null &&
    error.non_field_errors !== null &&
    error.non_field_errors !== undefined
      ? error.non_field_errors[0]
      : null;

  return (
    <Box component="form" className={classes.wrapper} noValidate>
      <Typography variant="h1" align="center">
        Sign Up
      </Typography>
      <Grid container>
        <Grid container className={classes.nameWrapper}>
          <TextField
            autoComplete="given-name"
            name="first_name"
            id="first_name"
            label="First name"
            autoFocus
            onChange={onChange}
          />

          <TextField
            id="last_name"
            label="Last name"
            name="last_name"
            autoComplete="family-name"
            onChange={onChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={onChange}
          />

          {usernameError !== null && (
            <Alert severity="error" className={classes.alert}>
              {usernameError}
            </Alert>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={onChange}
          />

          {emailError !== null && (
            <Alert severity="error" className={classes.alert}>
              {emailError}
            </Alert>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={onChange}
          />

          {passwordError !== null && (
            <Alert severity="error" className={classes.alert}>
              {passwordError}
            </Alert>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="re_password"
            label="Repeat password"
            type="password"
            id="re_password"
            autoComplete="re_password"
            onChange={onChange}
          />

          {rePasswordError !== null && (
            <Alert severity="error" className={classes.alert}>
              {rePasswordError}
            </Alert>
          )}

          {nonFieldError !== null && (
            <Alert severity="error" className={classes.alert}>
              {nonFieldError}
            </Alert>
          )}

          {isAccountCreated && (
            <Alert severity="success" className={classes.alert}>
              A verification url was sent to your email
            </Alert>
          )}
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={onSubmit}
        id="sign-up"
      >
        Register
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="body2">
            Already have an account? <Link href="/sign_in">Sign in</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
