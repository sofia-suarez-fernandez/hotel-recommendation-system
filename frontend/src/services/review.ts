import axios from "axios";

export const updateReview = (
  reviewId,
  hotelId,
  userAccountId,
  rating,
  sentiment,
  review_title,
  review_text,
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
    hotel_name_id: hotelId,
    user_account_it: userAccountId,
    rate: rating,
    sentiment: sentiment,
    review_title: review_title,
    review_text: review_text,
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
  userId?: number,
  hotelId?: string,
  rating?: number | null,
  review_title?: string,
  review_text?: string
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

  // async function getSentiment(reviewText: string): Promise<string> {
  //   const response = await fetch('http://localhost:8000/analyze', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ review_text: reviewText }),
  //   });
  
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  
  //   const data = await response.json();
  //   return data.sentiment;
  // }

  // const sentiment = review_text ? await analyze_sentiment(review_text) : null;
  const body = {
    user_account_id: userId,
    hotel_name_id: hotelId?.replace(/-/g, " "),
    rate: rating,
    sentiment: rating === null ? null : (Number(rating) < 3 ? 1 : (Number(rating) === 3 ? 2 : 3)),
    // sentiment: getSentiment(review_text ?? ""),
    review_title: review_title,
    review_text: review_text,
    tripdate: null,
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
