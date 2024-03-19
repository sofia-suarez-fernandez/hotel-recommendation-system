import useAxiosOnAction from "../useAxiosOnAction";

const useDeleteReviewById = (reviewId) => {
  const { response, error, loading, fetch } = useAxiosOnAction({
    method: "DELETE",
    url: `/reviews/${reviewId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + localStorage.getItem("access"),
      Accept: "application/json",
    },
  });

  return { response, error, loading, fetch };
};

export default useDeleteReviewById;
