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
import { useSignInFormStyles } from "./SignInFormStyles";
import { useSignInFormViewModel } from "./SignInFormViewModel";

export const SignInForm = (): JSX.Element => {
  const { onChange, onSubmit } = useSignInFormViewModel();
  const { classes } = useSignInFormStyles();

  const error = useSelector((state: RootState) => state.user.error);

  const emailError =
    error !== null && error.email !== null && error.email !== undefined
      ? error.email[0]
      : null;
  const passwordError =
    error !== null && error.password !== null && error.password !== undefined
      ? error.password[0]
      : null;
  const detailError =
    error !== null && error.detail !== null && error.detail !== undefined
      ? error.detail
      : null;

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      className={classes.wrapper}
      noValidate
    >
      <Typography variant="h1" align="center" className={classes.title}>
        Sign In
      </Typography>
      <TextField
        id="email"
        name="email"
        required
        autoFocus
        fullWidth
        margin="normal"
        autoComplete="email"
        label="Email"
        variant="outlined"
        onChange={onChange}
      />

      {emailError !== null && (
        <Alert severity="error" className={classes.alert}>
          {emailError}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onChange}
      />

      {passwordError !== null && (
        <Alert severity="error" className={classes.alert}>
          {passwordError}
        </Alert>
      )}

      {detailError !== null && (
        <Alert severity="error" className={classes.alert}>
          {" "}
          {detailError}
        </Alert>
      )}

      <Link href="/reset_password" variant="body2">
        Forgot your password?
      </Link>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.button}
        id="sign-in"
      >
        Sign In
      </Button>

      <Grid container justifyContent="center">
        <Grid item>
          <Typography variant="body2">
            Don't have an account yet? <Link href="/sign_up">Register now</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
