import CloseIcon from "@mui/icons-material/Close";
import RateReview from "@mui/icons-material/RateReview";
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
// import { CustomRating } from "../CustomRating/CustomRating";
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
    onChangeReviewTitle,
    isAuthenticated,
    review_text,
    rating,
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
          <Box display="flex" alignItems="center">
            <RateReview sx={{ mr: 1 }} />
            <Typography variant="h2" className={classes.title}>
              Write your review
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
            // <CustomRating onChange={onChangeRating} defaultValue={0} />
            <FormControl>
              <InputLabel id="rating-label">Rating</InputLabel>
              <Select
                labelId="rating-label"
                value={rating}
                onChange={onChangeRating}
                label="Rating"
              >
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
              autoFocus
              className={classes.reviewWrapper}
              onChange={onChangeReviewTitle}
              label="Title"
              placeholder="Write your review title here..."
            />
          )}

          {isAuthenticated === true && (
            <TextField
              multiline
              maxRows={5}
              className={classes.reviewWrapper}
              onChange={onChangeReview}
              label="Review"
              placeholder="Write your review here..."
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
              disabled={review_text ? false : true}
            >
              Send review
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};
