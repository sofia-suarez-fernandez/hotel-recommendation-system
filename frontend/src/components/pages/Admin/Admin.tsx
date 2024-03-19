import { Box, Container, Typography } from "@mui/material";
import useGetReviews from "../../../hooks/services/review/useGetReviews";
import { Loading } from "../../1_atoms/Loading";
import { AdminPanel } from "../../3_organisms/sections/AdminPanel/AdminPanel";
import { AdminProps } from "./AdminInterfaces";
import { useAdminStyles } from "./AdminStyles";

export const Admin = (props: AdminProps): JSX.Element => {
  const { classes } = useAdminStyles();

  const { response, loading } = useGetReviews();

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h1" align="center">
        Admin panel
      </Typography>

      {loading ? (
        <Loading />
      ) : (
        <Container className={classes.adminPanelWrapper}>
          <AdminPanel reviews={response} />
        </Container>
      )}
    </Box>
  );
};
