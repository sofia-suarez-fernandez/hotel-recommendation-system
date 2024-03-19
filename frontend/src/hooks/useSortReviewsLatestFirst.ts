// Sort reviews by updated_at and then by created_at
import { Review } from "../interfaces/review";

const useSortReviewsLatestFirst = (reviews?: Review[]): Review[] | [] => {
  if (reviews) {
    return reviews.sort((review1, review2) => {
      if (new Date(review1.updated_at) === new Date(review2.updated_at)) {
        return new Date(review1.created_at) < new Date(review2.created_at)
          ? -1
          : 1;
      } else {
        return new Date(review1.updated_at) < new Date(review2.updated_at)
          ? -1
          : 1;
      }
    });
  }
  return [];
};

export default useSortReviewsLatestFirst;
