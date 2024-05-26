import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getHotelById } from "../../../services/hotels";
import {
  getAccountUserById,
  // getTwitterUserById,
} from "../../../services/users";
import { ReviewUserViewModel } from "./ReviewUserInterfaces";

export const useReviewUserViewModel = ({ review }: ReviewUserViewModel) => {
  const createdAt = format(new Date(review.created_at), "dd-MM-yyyy H:mm");
  const updatedAt =
    review.updated_at !== null
      ? format(new Date(review.updated_at), "dd-MM-yyyy H:mm")
      : null;

  const [userTwitterUsername, setUserTwitterUsername] = useState<
    string | null
  >();
  const [userAccountUsername, setUserAccountUsername] = useState<
    string | null
  >();
  const username =
    userAccountUsername !== null ? userAccountUsername : userTwitterUsername;

  const [hotelName, setHotelName] = useState<string | null>();
  const [hotelLink, setHotelLink] = useState<string | null>();

  useEffect(() => {
    review.user_account_id !== null &&
      getAccountUserById(review.user_account_id).then((userAccount) => {
        setUserAccountUsername(userAccount.username);
        setUserTwitterUsername(null);
      });
    // review.user_twitter !== null &&
    //   getTwitterUserById(review.user_twitter).then((userTwitter) => {
    //     setUserAccountUsername(null);
    //     setUserTwitterUsername(userTwitter.username);
    //   });
    getHotelById(review.hotel_name_id).then((hotel) => {
      setHotelName(hotel.hotel_name);
      const hotelSlug = hotel.hotel_name.replace(/ /g, "-"); //+ "-" + hotel.id;
      setHotelLink("/hotel/" + hotelSlug);
    });
  }, [hotelName, review.hotel_name_id, review.user_account_id, /*review.user_twitter*/]);

  const avatarLetter = username && username.charAt(0);

  return { createdAt, updatedAt, username, hotelName, avatarLetter, hotelLink };
};
