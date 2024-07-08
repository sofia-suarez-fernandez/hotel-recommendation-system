import useAxiosOnAction from "../useAxiosOnAction";

const useUpdateReview = (
  reviewId,
  hotelId,
  userAccountId,
  newRating,
  newReview,
  newReviewTitle,
  createdAt,
  included,
  newSentiment?,
) => {
  const currentDate = new Date();

  const { response, error, loading, fetch } = useAxiosOnAction({
    method: "PUT",
    url: `/reviews/${reviewId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + localStorage.getItem("access"),
      Accept: "application/json",
    },
    data: {
      id: reviewId,
      hotel_name_id: hotelId,
      user_account_id: userAccountId,
      rate: newRating,
      sentiment: Number(newSentiment),
      review_title: newReviewTitle,
      review_text: newReview,
      created_at: createdAt,
      updated_at: currentDate,
      included: included,
    },
  });

  return { response, error, loading, fetch };
};

export default useUpdateReview;
