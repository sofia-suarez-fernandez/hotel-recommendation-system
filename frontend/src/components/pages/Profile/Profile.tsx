import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Review as TypeReview } from "../../../interfaces/review";
import { getReviewsByUserId } from "../../../services/review";
import { UserInformationSection } from "../../3_organisms/sections/UserInformationSection/UserInformationSection";
import { UserReviewsSection } from "../../3_organisms/sections/UserReviewsSection/UserReviewsSection";
import Layout from "../../4_templates/Layout/Layout";

export const Profile = (): JSX.Element => {
  const firstName = useSelector(
    (state: RootState) => state.user.user?.first_name
  );
  const lastName = useSelector(
    (state: RootState) => state.user.user?.last_name
  );
  const username = useSelector((state: RootState) => state.user.user?.username);
  const email = useSelector((state: RootState) => state.user.user?.email);

  const userId = useSelector((state: RootState) => state.user.user?.id);
  const [reviews, setReviews] = useState<TypeReview[]>([]);

  useEffect(() => {
    userId &&
      getReviewsByUserId(userId).then((reviews) => {
        setReviews(reviews);
      });
  }, [userId]);

  const [loadedIndex, setLoadedIndex] = useState(0);

  useEffect(() => {
    if (loadedIndex < 2) {
      const timer = setTimeout(() => {
        setLoadedIndex(loadedIndex + 1);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loadedIndex]);

  return (
    <Layout isGreyBackground>
      {loadedIndex >= 0 && (
        <UserInformationSection
          firstName={firstName}
          lastName={lastName}
          username={username}
          email={email}
        />
      )}

      {loadedIndex >= 0 && <UserReviewsSection reviews={reviews} />}
    </Layout>
  );
};
