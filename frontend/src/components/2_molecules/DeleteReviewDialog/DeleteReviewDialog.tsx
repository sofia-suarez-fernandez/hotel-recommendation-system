import CloseIcon from "@mui/icons-material/Close";
import Delete from "@mui/icons-material/Delete";
import {
  Box,
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

  const { open, handleOpen, handleClose, handleSubmit, isAuthenticated } =
    useDeleteReviewDialogViewModel({ reviewId });

  return (
    <>
      {isAuthenticated === true && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleOpen}
          className={classes.buttonWrapper}
        >
          <Typography>Remove</Typography>
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
            <Delete sx={{ mr: 1 }} />
            <Typography variant="h2" className={classes.title}>
              Remove review
            </Typography>
          </Box>

          <Typography>
            Are you sure you want to remove this review? Please note that this
            action is irreversible.
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
