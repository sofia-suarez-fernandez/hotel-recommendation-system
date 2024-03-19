import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery, useTheme } from "@mui/material";
import ReactPaginate from "react-paginate";
import { ReviewsList } from "../../lists/ReviewsList/ReviewsList";
import { HotelReviewsPaginationProps } from "./HotelReviewsPaginationInterfaces";
import { useHotelReviewsPaginationStyles } from "./HotelReviewsPaginationStyles";
import { useHotelReviewsPaginationViewModel } from "./HotelReviewsPaginationViewModel";

export const HotelReviewsPagination = ({
  reviews,
}: HotelReviewsPaginationProps): JSX.Element => {
  const { currentReviews, handlePageClick, pageCount } =
    useHotelReviewsPaginationViewModel({ reviews });
  const { classes } = useHotelReviewsPaginationStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      <ReviewsList reviews={currentReviews} />

      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowForwardIosIcon fontSize="small" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={!isMobile ? 4 : 1}
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
