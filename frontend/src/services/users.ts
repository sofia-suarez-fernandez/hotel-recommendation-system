import axios from "axios";

export const getTwitterUserById = (userId) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = axios
    .get(`http://localhost:8000/users/twitter/${userId}/`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};

export const getAccountUserById = (userId) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = axios
    .get(`http://localhost:8000/users/account/${userId}/`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};
