import axios from "axios";

export const getHotelById = (hotelId) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = axios
    .get(`http://localhost:8000/hotels/${hotelId}/`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};
