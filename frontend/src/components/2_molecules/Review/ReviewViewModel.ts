import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  getAccountUserById,
} from "../../../services/users";
import { ReviewViewModel } from "./ReviewInterfaces";

export const useReviewViewModel = ({ review }: ReviewViewModel) => {
  const createdAt = format(new Date(review.created_at), "dd-MM-yyyy H:mm");
  const updatedAt =
    review.updated_at !== null
      ? format(new Date(review.updated_at), "dd-MM-yyyy H:mm")
      : null;

  const [userAccountUsername, setUserAccountUsername] = useState<
    string | null
  >();

  useEffect(() => {
    if (review.user_account_id !== null && review.user_account_id !== undefined) {
      getAccountUserById(review.user_account_id).then((userAccount) => {
        setUserAccountUsername(userAccount?.username);
      });
    }
  }, [review]);

  const username =
    userAccountUsername !== null ? userAccountUsername : "Anonymous";

  const avatarLetter = username && username.charAt(0);

  return { createdAt, updatedAt, username, avatarLetter };
};
