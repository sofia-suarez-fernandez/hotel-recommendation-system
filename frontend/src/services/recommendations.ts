import axios from "axios";

export const getRecommendedHotelsByUserId = (city, userId) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("access_token")
        ? "JWT " + localStorage.getItem("access_token")
        : null,
    },
  };

  const response = axios
    .get(
      `http://localhost:8000/recommendations/${city}/users/${userId}/`,
      config
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};

export const getPopularHotels = (locality) => {
  const response = axios
    .get(`http://localhost:8000/recommendations/${locality}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};
