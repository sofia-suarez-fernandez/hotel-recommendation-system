import useAxios from "../useAxios";

const useAmenitiesByHotelId = (hotelId) => {
  const { response, error, loading } = useAxios({
    method: "GET",
    url: `/hotels/${hotelId}/amenities`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { response, error, loading };
};

export default useAmenitiesByHotelId;