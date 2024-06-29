import CloseIcon from "@mui/icons-material/Close";
import ModeEdit from "@mui/icons-material/ModeEdit";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { UpdateReviewDialogProps } from "./UpdateReviewDialogInterfaces";
import { useUpdateReviewDialogStyles } from "./UpdateReviewDialogStyles";
import { useUpdateReviewDialogViewModel } from "./UpdateReviewDialogViewModel";

export const UpdateReviewDialog = ({
  review,
}: UpdateReviewDialogProps): JSX.Element => {
  const { classes } = useUpdateReviewDialogStyles();
  const {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    onChangeRating,
    onChangeReview,
    onChangeReviewTitle,
    newRating,
    isAuthenticated,
  } = useUpdateReviewDialogViewModel({ review });

  return (
    <>
      {isAuthenticated === true && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          className={classes.buttonWrapper}
        >
          <Typography>Modify</Typography>
        </Button>
      )}

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
          <Box display="flex" alignItems="center">
            <ModeEdit sx={{ mr: 1 }} />
            <Typography variant="h2" className={classes.title}>
              Modify your review
            </Typography>
          </Box>

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
            <FormControl>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                value={newRating}
                onChange={onChangeRating}
                label="Rating"
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          )}

          {isAuthenticated === true && (
            <TextField
              className={classes.reviewWrapper}
              onChange={onChangeReviewTitle}
              label="Title"
              placeholder="Update your review title here..."
              defaultValue={review.review_title}
            />
          )}

          {isAuthenticated === true && (
            <TextField
              autoFocus
              multiline
              maxRows={5}
              className={classes.reviewWrapper}
              onChange={onChangeReview}
              defaultValue={review.review_text}
              label="Review *"
              placeholder="Update your review here..."
            />
          )}
        </DialogContent>

        {isAuthenticated === true && (
          <DialogActions className={classes.dialogActions}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              autoFocus
            >
              Modify review
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};
