import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import { createReview } from "../../../services/review";

export const useCreateReviewDialogViewModel = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setOpen(false);
  };

  const routeParams = useParams();

  const hotelId = routeParams.slug_id;

  const userId = useSelector((state: RootState) => state.user.user?.id);

  const handleSubmit = () => {
    createReview(Number(userId), hotelId, rating, review, review);
    handleClose();
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const onChangeRating = (e) => {
    const rating = e.target.value;
    setRating(rating);
  };

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    onChangeRating,
    onChangeReview,
    isAuthenticated,
    review,
  };
};
