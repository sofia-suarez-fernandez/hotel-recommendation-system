import { Alert, Box, Button, TextField } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useResetPasswordFormStyles } from "./ResetPasswordFormStyles";
import { useResetPasswordFormViewModel } from "./ResetPasswordFormViewModel";

export const ResetPasswordForm = (): JSX.Element => {
  const { onChange, onSubmit, isRequestSent } = useResetPasswordFormViewModel();
  const { classes } = useResetPasswordFormStyles();

  const error = useSelector((state: RootState) => state.user.error);

  const emailError =
    error !== null && error.email !== null && error.email !== undefined
      ? error.email[0]
      : null;

  const notEmailError =
    error !== null && error.not_email !== null && error.not_email !== undefined
      ? error.not_email[0]
      : null;

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      className={classes.wrapper}
      noValidate
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="e-mail"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={onChange}
      />

      {isRequestSent === true &&
        emailError === null &&
        notEmailError === null && (
          <Alert severity="success" className={classes.alert}>
            A confirmation url was sent to your email
          </Alert>
        )}

      {emailError !== null && (
        <Alert severity="error" className={classes.alert}>
          {emailError}
        </Alert>
      )}

      {notEmailError && notEmailError !== null && (
        <Alert severity="error" className={classes.alert}>
          {notEmailError}
        </Alert>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Reset password
      </Button>
    </Box>
  );
};
