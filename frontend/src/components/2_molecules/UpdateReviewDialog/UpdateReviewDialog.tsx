import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { CustomRating } from "../CustomRating/CustomRating";
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
  } = useUpdateReviewDialogViewModel({ review });

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        className={classes.buttonWrapper}
      >
        <Typography>Modify</Typography>
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
            Modify your review
          </Typography>

          <CustomRating
            onChange={onChangeRating}
            defaultValue={review.rate}
          />

          <TextField
            multiline
            maxRows={5}
            className={classes.reviewWrapper}
            onChange={onChangeReview}
            defaultValue={review.review_text}
          />
        </DialogContent>

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
      </Dialog>
    </>
  );
};
