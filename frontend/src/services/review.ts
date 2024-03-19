import axios from "axios";

export const updateReview = (
  reviewId,
  hotelId,
  userAccountId,
  rating,
  sentiment,
  review,
  createdAt,
  included
) => {
  const currentDate = new Date();

  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: "JWT " + localStorage.getItem("access"),
      Accept: "application/json",
    },
  };

  const body = {
    id: reviewId,
    hotel: hotelId,
    user: userAccountId,
    rating: rating,
    sentiment: sentiment,
    review: review,
    created_at: createdAt,
    updated_at: currentDate,
    included: included,
  };

  const response = axios
    .put(`http://localhost:8000/reviews/${reviewId}/`, body, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};

export const getReviews = () => {
  const config = {
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
    },
  };

  const response = axios
    .get(`http://localhost:8000/reviews/`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};

export const getReviewsByUserId = (userId) => {
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
    .get(`http://localhost:8000/users/${userId}/reviews/`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};

export const createReview = (
  userId?: string,
  hotelId?: string,
  rating?: number | null,
  review?: string
) => {
  const current_date = new Date();

  const config = {
    headers: {
      "Content-type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("access_token")
        ? "JWT " + localStorage.getItem("access_token")
        : null,
    },
  };

  const body = {
    user_account: userId,
    hotel: hotelId,
    rating: rating,
    sentiment: rating,
    review: review,
    created_at: current_date,
    updated_at: null,
    included: rating === null ? false : true,
  };

  const response = axios
    .post(`http://localhost:8000/reviews/create/`, body, config)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      reportError({ message: error.message });
    });

  return response;
};
