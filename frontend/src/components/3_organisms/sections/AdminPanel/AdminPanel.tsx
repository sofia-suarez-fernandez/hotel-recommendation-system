import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { updateReview } from "../../../../services/review";
import { AdminPanelProps } from "./AdminPanelInterfaces";
import { useAdminPanelStyles } from "./AdminPanelStyles";

export const AdminPanel = ({ reviews: rows }: AdminPanelProps): JSX.Element => {
  const { classes } = useAdminPanelStyles();

  function RowMenuCell(props) {
    const { api, id } = props;

    const handleSaveClick = () => {
      apiRef.current.stopRowEditMode({ id: id });

      setTimeout(() => {
        const rowParams = api.getRowParams(id);
        updateReview(
          rowParams.row.id,
          rowParams.row.hotel,
          rowParams.row.user_account,
          rowParams.row.rating,
          rowParams.row.sentiment,
          rowParams.row.review,
          rowParams.row.created_at,
          rowParams.row.included
        );
      }, 1000);
    };

    const handleEditClick = () => {
      apiRef.current.startRowEditMode({ id: id });
    };

    const handleCancelClick = () => {
      apiRef.current.stopRowEditMode({ id: id, ignoreModifications: true });
    };

    return (
      <>
        <IconButton
          color="primary"
          onClick={handleEditClick}
          disabled={apiRef.current.getRowMode(id) === "edit"}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="primary"
          onClick={handleSaveClick}
          disabled={apiRef.current.getRowMode(id) === "view"}
        >
          <SaveIcon />
        </IconButton>

        <IconButton
          color="primary"
          onClick={handleCancelClick}
          disabled={apiRef.current.getRowMode(id) === "view"}
        >
          <CancelIcon />
        </IconButton>
      </>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "included",
      headerName: "Included",
      description:
        "Include (🟩) / Don't include (🟥) the review in the recommender system",
      hideable: false,
      valueOptions: [
        { value: true, label: "🟩" },
        { value: false, label: "🟥" },
      ],
      type: "singleSelect",
      editable: true,
      width: 100,
    },
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    // },
    {
      field: "sentiment",
      headerName: "Sentiment",
      hideable: false,
      valueOptions: [
        { value: 1, label: "Negative" },
        { value: 2, label: "Neutral" },
        { value: 3, label: "Positive" },
      ],
      type: "singleSelect",
      editable: true,
      width: 100,
    },
    {
      field: "rate",
      headerName: "Rate",
      hideable: false,
      description: "From 1 to 3",
      editable: false,
      width: 100,
    },
    {
      field: "review_text",
      headerName: "Review Text",
      description: "Review in the web application",
      hideable: false,
      width: 500,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
    },
    {
      field: "hotel_name",
      headerName: "Hotel Name",
      width: 100,
    },
    {
      field: "user_account",
      headerName: "User Account ID",
      description: "User that wrote a review in the web application",
      width: 130,
    },
    // {
    //   field: "user_twitter",
    //   headerName: "User Twitter ID",
    //   description: "User that made a twit",
    //   width: 220,
    // },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: RowMenuCell,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
      width: 150,
      hideable: false,
    },
  ];

  const apiRef = useGridApiRef();

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          columns: {
            columnVisibilityModel: {
              included: true,
              // id: false,
              sentiment: true,
              rate: true,
              review_text: true,
              created_at: false,
              updated_at: false,
              hotel_name: false,
              user_account: false,
              // user_twitter: false,
              actions: true,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        getCellClassName={() => classes.cell}
        getRowClassName={() => classes.row}
        density="comfortable"
        apiRef={apiRef}
        editMode="row"
        className={classes.wrapper}
      />
    </div>
  );
};
