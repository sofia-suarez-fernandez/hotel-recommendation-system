const useRatingBase10 = (rating?: number): number | undefined => {
  // const ratingBase10 = rating && Math.round(((rating * 10) / 3) * 10) / 10;
  const ratingBase10 = rating && Math.round(rating * 2 * 10) / 10;
  return ratingBase10;
};

export default useRatingBase10;
