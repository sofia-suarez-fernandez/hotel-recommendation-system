import { useState } from "react";
import useDeleteReviewById from "../../../hooks/services/review/useDeleteReviewById";
import { DeleteReviewDialogProps } from "./DeleteReviewDialogInterfaces";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";


export const useDeleteReviewDialogViewModel = ({
  reviewId,
}: DeleteReviewDialogProps) => {
  const [open, setOpen] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

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

  return { open, handleOpen, handleClose, handleSubmit, isAuthenticated };
};
