import { useState } from "react";
import {
  UserReviewsPaginationProps,
  UserReviewsPaginationViewModel,
} from "./UserReviewsPaginationInterfaces";

export const useUserReviewsPaginationViewModel = ({
  reviews,
}: UserReviewsPaginationProps): UserReviewsPaginationViewModel => {
  const itemsPerPage = 3;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentReviews = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  return { currentReviews, handlePageClick, pageCount };
};
