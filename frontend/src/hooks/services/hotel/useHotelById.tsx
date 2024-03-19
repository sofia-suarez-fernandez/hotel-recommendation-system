import useAxios from "../useAxios";

const useHotelById = (hotelId) => {
  const { response, error, loading } = useAxios({
    method: "GET",
    url: `/hotels/${hotelId}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { response, error, loading };
};

export default useHotelById;
