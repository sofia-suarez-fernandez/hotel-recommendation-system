import { Review } from "../../../../interfaces/review";

export interface UserReviewsPaginationProps {
  reviews: Review[];
}

export interface UserReviewsPaginationViewModel {
  currentReviews: Review[];
  handlePageClick: any;
  pageCount: number;
}
