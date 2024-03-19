import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMediaQuery, useTheme } from "@mui/material";
import ReactPaginate from "react-paginate";
import { ReviewsUserList } from "../../lists/ReviewsUserList/ReviewsUserList";
import { UserReviewsPaginationProps } from "./UserReviewsPaginationInterfaces";
import { useUserReviewsPaginationStyles } from "./UserReviewsPaginationStyles";
import { useUserReviewsPaginationViewModel } from "./UserReviewsPaginationViewModel";

export const UserReviewsPagination = ({
  reviews,
}: UserReviewsPaginationProps): JSX.Element => {
  const { currentReviews, handlePageClick, pageCount } =
    useUserReviewsPaginationViewModel({ reviews });
  const { classes } = useUserReviewsPaginationStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      <ReviewsUserList reviews={currentReviews} />

      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowForwardIosIcon fontSize="small" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={!isMobile ? 3 : 1}
        marginPagesDisplayed={2}
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
