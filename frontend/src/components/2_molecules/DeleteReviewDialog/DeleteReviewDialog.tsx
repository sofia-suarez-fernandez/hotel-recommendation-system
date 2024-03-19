import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteReviewDialogProps } from "./DeleteReviewDialogInterfaces";
import { useDeleteReviewDialogStyles } from "./DeleteReviewDialogStyles";
import { useDeleteReviewDialogViewModel } from "./DeleteReviewDialogViewModel";

export const DeleteReviewDialog = ({
  reviewId,
}: DeleteReviewDialogProps): JSX.Element => {
  const { classes } = useDeleteReviewDialogStyles();

  const { open, handleOpen, handleClose, handleSubmit } =
    useDeleteReviewDialogViewModel({ reviewId });

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={handleOpen}
        className={classes.buttonWrapper}
      >
        <Typography>Remove</Typography>
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
            Remove review
          </Typography>

          <Typography>
            Do you really want to remove this review? This process cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="error"
            autoFocus
          >
            Remove review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
