import useAxios from "../useAxios";

const useGetReviews = () => {
  const { response, error, loading } = useAxios({
    method: "GET",
    url: `/reviews/`,
  });

  return { response, error, loading };
};

export default useGetReviews;
