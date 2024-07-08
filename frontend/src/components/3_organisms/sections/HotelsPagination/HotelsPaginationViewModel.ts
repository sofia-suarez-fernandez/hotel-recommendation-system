import { useState } from "react";
import {
  HotelsPaginationProps,
  HotelsPaginationViewModel,
} from "./HotelsPaginationInterfaces";

export const usePaginationViewModel = ({
  hotels,
}: HotelsPaginationProps): HotelsPaginationViewModel => {
  const itemsPerPage = 10;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentHotels = hotels.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(hotels.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hotels.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { currentHotels, handlePageClick, pageCount, itemOffset };
};
