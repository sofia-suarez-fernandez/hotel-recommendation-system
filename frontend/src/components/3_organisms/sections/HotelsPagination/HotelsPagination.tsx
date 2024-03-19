import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReactPaginate from "react-paginate";
import { HotelsList } from "../../lists/HotelsList/HotelsList";
import { HotelsPaginationProps } from "./HotelsPaginationInterfaces";
import { useHotelsPaginationStyles } from "./HotelsPaginationStyles";
import { usePaginationViewModel } from "./HotelsPaginationViewModel";

export const HotelsPagination = ({
  hotels,
}: HotelsPaginationProps): JSX.Element => {
  const { currentHotels, handlePageClick, pageCount, itemOffset } =
    usePaginationViewModel({
      hotels,
    });
  const { classes } = useHotelsPaginationStyles();

  return (
    <>
      <HotelsList hotels={currentHotels} itemOffset={itemOffset} />

      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowForwardIosIcon fontSize="small" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<ArrowBackIosNewIcon fontSize="small" />}
        renderOnZeroPageCount={null}
        className={classes.pagination}
        containerClassName="pagination"
        pageLinkClassName="pageNumber"
        previousLinkClassName="previousPage"
        nextLinkClassName="nextPage"
        activeClassName="active"
      />
    </>
  );
};
