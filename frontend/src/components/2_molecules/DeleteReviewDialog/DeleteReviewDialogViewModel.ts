import { useState } from "react";
import useDeleteReviewById from "../../../hooks/services/review/useDeleteReviewById";
import { DeleteReviewDialogProps } from "./DeleteReviewDialogInterfaces";

export const useDeleteReviewDialogViewModel = ({
  reviewId,
}: DeleteReviewDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { fetch } = useDeleteReviewById(reviewId);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch().then(() => {
      handleClose();
      window.location.reload();
    });
  };

  return { open, handleOpen, handleClose, handleSubmit };
};
