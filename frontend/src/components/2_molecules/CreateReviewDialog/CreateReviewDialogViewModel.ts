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

  const [rating, setRating] = useState<number | null>(1);
  const [review_text, setReviewText] = useState<string | undefined>(undefined);
  const [review_title, setReviewTitle] = useState<string | undefined>(undefined);

  const handleClose = () => {
    setOpen(false);
  };

  const routeParams = useParams();

  const hotelId = routeParams.slug_id;

  const userId = useSelector((state: RootState) => state.user.user?.id);

  const handleSubmit = () => {
    createReview(Number(userId), hotelId, rating, review_title, review_text);
    handleClose();
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const onChangeRating = (e) => {
    const rating = e.target.value;
    setRating(rating);
  };

  const onChangeReviewTitle = (e) => {
    const review_title = e.target.value;
    setReviewTitle(review_title);
  }

  const onChangeReview = (e) => {
    const review_text = e.target.value;
    setReviewText(review_text);
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleSubmit,
    onChangeRating,
    onChangeReviewTitle,
    onChangeReview,
    isAuthenticated,
    review_title,
    review_text,
    rating,
  };
};
