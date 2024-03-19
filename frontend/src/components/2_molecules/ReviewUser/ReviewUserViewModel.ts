import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getHotelById } from "../../../services/hotels";
import {
  getAccountUserById,
  getTwitterUserById,
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
    review.user_account !== null &&
      getAccountUserById(review.user_account).then((userAccount) => {
        setUserAccountUsername(userAccount.username);
        setUserTwitterUsername(null);
      });
    review.user_twitter !== null &&
      getTwitterUserById(review.user_twitter).then((userTwitter) => {
        setUserAccountUsername(null);
        setUserTwitterUsername(userTwitter.username);
      });
    getHotelById(review.hotel).then((hotel) => {
      setHotelName(hotel.name);
      const hotelSlug = hotel.name.replace(/ /g, "-") + "-" + hotel.id;
      setHotelLink("/hotel/" + hotelSlug);
    });
  }, [hotelName, review.hotel, review.user_account, review.user_twitter]);

  const avatarLetter = username && username.charAt(0);

  return { createdAt, updatedAt, username, hotelName, avatarLetter, hotelLink };
};
