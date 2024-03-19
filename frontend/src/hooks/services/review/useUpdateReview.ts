import useAxiosOnAction from "../useAxiosOnAction";

const useUpdateReview = (
  reviewId,
  hotelId,
  userAccountId,
  newSentiment,
  newRating,
  newReview,
  createdAt,
  included
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
      hotel: hotelId,
      user: userAccountId,
      rating: newRating,
      sentiment: newSentiment,
      review: newReview,
      created_at: createdAt,
      updated_at: currentDate,
      included: included,
    },
  });

  return { response, error, loading, fetch };
};

export default useUpdateReview;
