import { useState } from "react";
import useUpdateReview from "../../../hooks/services/review/useUpdateReview";
import { UpdateReviewDialogProps } from "./UpdateReviewDialogInterfaces";

export const useUpdateReviewDialogViewModel = ({
  review,
}: UpdateReviewDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [newRating, setNewRating] = useState<number>();
  const [newReview, setNewReview] = useState<string>();

  const handleClose = () => {
    setOpen(false);
  };

  const { fetch } = useUpdateReview(
    review.id,
    review.hotel_name_id,
    review.user_account_id,
    newRating,
    newRating,
    newReview,
    review.created_at,
    review.included
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch().then(() => {
      handleClose();
      window.location.reload();
    });
  };

  const onChangeRating = (e) => {
    const newRating = e.target.value;
    setNewRating(newRating);
  };

  const onChangeReview = (e) => {
    const newReview = e.target.value;
    setNewReview(newReview);
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    onChangeRating,
    onChangeReview,
  };
};
