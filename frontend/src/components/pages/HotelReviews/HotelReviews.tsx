import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHotelById from "../../../hooks/services/hotel/useHotelById";
import useReviewsByHotelId from "../../../hooks/services/review/useReviewsByHotelId";
import { Section } from "../../1_atoms/Section/Section";
import { HotelHero } from "../../3_organisms/sections/HotelHero/HotelHero";
import { HotelReviewsSection } from "../../3_organisms/sections/HotelReviewsSection/HotelReviewsSection";
import Layout from "../../4_templates/Layout/Layout";

export const HotelReviews = (): JSX.Element => {
  const routeParams = useParams();
  // const hotelId = routeParams.slug_id?.split("-").pop();
  const hotelId = routeParams.slug_id;

  const { response: hotel } = useHotelById(hotelId);
  const { response: reviews, loading: reviewsLoading } =
    useReviewsByHotelId(hotelId);

  var heroElement = document.getElementById("hero");
  var heroPosition = heroElement?.getBoundingClientRect();
  const [position, setPosition] = useState(0);

  useEffect(() => {
    heroPosition && setPosition(heroPosition.height + 100);
  }, [heroPosition]);

  if (window.location.hash) {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  }

  return (
    <Layout isGreyBackground>
      <Section isHeroSection>
        {hotel && (
          <div id="hero">
            <HotelHero hotel={hotel} />
          </div>
        )}
      </Section>

      <Section paddingTop={false} marginBottom={false}>
        <div id="reviews">
          <HotelReviewsSection reviews={reviews} loading={reviewsLoading} />
        </div>
      </Section>
    </Layout>
  );
};
