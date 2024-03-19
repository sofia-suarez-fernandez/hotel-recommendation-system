import { Hotel } from "../../../../interfaces/hotel";

export interface HotelsPaginationProps {
  hotels: Hotel[];
}

export interface HotelsPaginationViewModel {
  currentHotels: Hotel[];
  handlePageClick: any;
  pageCount: number;
  itemOffset: number;
}
