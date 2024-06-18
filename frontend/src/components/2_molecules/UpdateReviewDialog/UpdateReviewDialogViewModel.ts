import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import useUpdateReview from "../../../hooks/services/review/useUpdateReview";
import { UpdateReviewDialogProps } from "./UpdateReviewDialogInterfaces";
// import { is } from "date-fns/locale";

export const useUpdateReviewDialogViewModel = ({
  review,
}: UpdateReviewDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [newRating, setNewRating] = useState<number>(Math.round(review.rate) || 1);
  const [newReview, setNewReview] = useState<string>();
  const [newReviewTitle, setNewReviewTitle] = useState<string>();

  const handleClose = () => {
    setOpen(false);
  };

  const { fetch } = useUpdateReview(
    review.id,
    review.hotel_name_id,
    review.user_account_id,
    Number(newRating),
    newReview,
    newReviewTitle,
    review.created_at,
    review.included,
    // sentiment (optional)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch().then(() => {
      handleClose();
      window.location.reload();
    });
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const onChangeRating = (e) => {
    const newRating = e.target.value;
    setNewRating(Number(newRating));
  };

  const onChangeReview = (e) => {
    const newReview = e.target.value;
    setNewReview(newReview);
  };

  const onChangeReviewTitle = (e) => {
    const newReviewTitle = e.target.value;
    setNewReviewTitle(newReviewTitle);
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    onChangeRating,
    onChangeReview,
    onChangeReviewTitle,
    newRating,
    isAuthenticated,
  };
};
