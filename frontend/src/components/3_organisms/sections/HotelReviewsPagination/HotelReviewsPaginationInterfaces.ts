import { Review } from "../../../../interfaces/review";

export interface HotelReviewsPaginationProps {
  reviews: Review[];
}

export interface HotelReviewsPaginationViewModel {
  currentReviews: Review[];
  handlePageClick: any;
  pageCount: number;
}
