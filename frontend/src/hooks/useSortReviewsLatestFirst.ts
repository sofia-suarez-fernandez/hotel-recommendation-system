// Sort reviews by updated_at and then by created_at
import { Review } from "../interfaces/review";

const useSortReviewsLatestFirst = (reviews?: Review[]): Review[] | [] => {
  if (reviews) {
    return reviews.sort((review1, review2) => {
      const updatedTime1 = new Date(review1.updated_at).getTime();
      const updatedTime2 = new Date(review2.updated_at).getTime();
      const createdTime1 = new Date(review1.created_at).getTime();
      const createdTime2 = new Date(review2.created_at).getTime();

      // First, compare by updated_at
      if (updatedTime1 !== updatedTime2) {
        return updatedTime2 - updatedTime1;
      }

      // If updated_at is equal, then compare by created_at
      return createdTime2 - createdTime1;
    });
  }
  return [];
};

export default useSortReviewsLatestFirst;
