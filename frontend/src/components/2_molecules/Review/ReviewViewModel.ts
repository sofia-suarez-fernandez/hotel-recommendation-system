import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  getAccountUserById,
  // getTwitterUserById,
} from "../../../services/users";
import { ReviewViewModel } from "./ReviewInterfaces";

export const useReviewViewModel = ({ review }: ReviewViewModel) => {
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

  useEffect(() => {
    // review.user_account_id !== null &&
    //   getAccountUserById(review.user_account_id).then((userAccount) => {
    //     setUserAccountUsername(userAccount?.username);
    //     setUserTwitterUsername(null);
    //   });
    if (review.user_account_id !== null && review.user_account_id !== undefined) {
      getAccountUserById(review.user_account_id).then((userAccount) => {
        setUserAccountUsername(userAccount?.username);
        setUserTwitterUsername(null);
      });
    }
    // review.user_twitter !== null &&
    //   getTwitterUserById(review.user_twitter).then((userTwitter) => {
    //     setUserAccountUsername(null);
    //     setUserTwitterUsername(userTwitter.username);
    //   });
  }, [review]);

  const username =
    userAccountUsername !== null ? userAccountUsername : userTwitterUsername;

  const avatarLetter = username && username.charAt(0);

  return { createdAt, updatedAt, username, avatarLetter };
};
