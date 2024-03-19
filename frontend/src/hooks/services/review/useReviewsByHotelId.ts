import useAxios from "../useAxios";

const useReviewsByHotelId = (hotelId) => {
  const { response, error, loading } = useAxios({
    method: "GET",
    url: `/hotels/${hotelId}/reviews`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { response, error, loading };
};

export default useReviewsByHotelId;
