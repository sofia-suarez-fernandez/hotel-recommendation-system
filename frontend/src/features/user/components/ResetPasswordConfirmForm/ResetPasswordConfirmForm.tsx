import { Alert, Box, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useResetPasswordConfirmFormStyles } from "./ResetPasswordConfirmFormStyles";
import { useResetPasswordConfirmFormViewModel } from "./ResetPasswordConfirmFormViewModel";

export const ResetPasswordConfirmForm = (): JSX.Element => {
  const { onSubmit, onChange } = useResetPasswordConfirmFormViewModel();
  const { classes } = useResetPasswordConfirmFormStyles();

  const error = useSelector((state: RootState) => state.user.error);

  const newPasswordError =
    error !== null &&
    error.new_password !== null &&
    error.new_password !== undefined
      ? error.new_password[0]
      : null;

  const reNewPasswordError =
    error !== null &&
    error.re_new_password !== null &&
    error.re_new_password !== undefined
      ? error.re_new_password[0]
      : null;

  const nonFieldError =
    error !== null &&
    error.non_field_errors !== null &&
    error.non_field_errors !== undefined
      ? error.non_field_errors[0]
      : null;

  const tokenError =
    error !== null && error.token !== null && error.token !== undefined
      ? error.token[0]
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
        name="new_password"
        label="New password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onChange}
      />

      {newPasswordError !== null && (
        <Alert severity="error" className={classes.alert}>
          {newPasswordError}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        name="re_new_password"
        label="Confirm new password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onChange}
      />

      {nonFieldError !== null && (
        <Alert severity="error" className={classes.alert}>
          {nonFieldError}
        </Alert>
      )}

      {reNewPasswordError !== null && (
        <Alert severity="error" className={classes.alert}>
          {reNewPasswordError}
        </Alert>
      )}

      {tokenError !== null && (
        <Alert severity="error" className={classes.alert}>
          {tokenError}
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
