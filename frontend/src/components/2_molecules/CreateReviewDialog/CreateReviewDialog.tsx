import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { CustomRating } from "../CustomRating/CustomRating";
import { useCreateReviewDialogStyles } from "./CreateReviewDialogStyles";
import { useCreateReviewDialogViewModel } from "./CreateReviewDialogViewModel";

export const CreateReviewDialog = (): JSX.Element => {
  const { classes } = useCreateReviewDialogStyles();

  const {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    onChangeRating,
    onChangeReview,
    isAuthenticated,
    review,
  } = useCreateReviewDialogViewModel();

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        className={classes.buttonWrapper}
      >
        <Typography>Write a review</Typography>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className={classes.dialogContent}>
          <Typography variant="h2" className={classes.title}>
            Write a review
          </Typography>

          {isAuthenticated === false && (
            <Alert severity="error" className={classes.alert}>
              You have to{" "}
              <Link href="/sign_in" className={classes.singInLink}>
                sign in
              </Link>{" "}
              first
            </Alert>
          )}

          {isAuthenticated === true && (
            <CustomRating onChange={onChangeRating} defaultValue={0} />
          )}

          {isAuthenticated === true && (
            <TextField
              multiline
              maxRows={5}
              className={classes.reviewWrapper}
              onChange={onChangeReview}
            />
          )}
        </DialogContent>

        {isAuthenticated === true && (
          <DialogActions className={classes.dialogActions}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              autoFocus
              disabled={review ? false : true}
            >
              Send review
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};
