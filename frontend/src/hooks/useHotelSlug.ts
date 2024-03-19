const useHotelSlug = (hotelId: string, hotelName: string): string => {
  const slug = hotelName.replace(/ /g, "-") + "-" + hotelId;
  return slug;
};

export default useHotelSlug;
