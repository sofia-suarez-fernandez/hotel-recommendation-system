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
        console.log(rowParams.row);
        updateReview(
          rowParams.row.id,
          rowParams.row.hotel_name_id,
          rowParams.row.user_account_id,
          rowParams.row.rate,
          rowParams.row.sentiment,
          rowParams.row.review_text,
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
      width: 400,
    },
    {
      field: "created_at",
      headerName: "Created At",
      description: "Time the review was created in the web application",
      width: 200,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      description: "Last time the review was updated in the web application",
      width: 200,
    },
    {
      field: "hotel_name_id",
      headerName: "Hotel Name",
      description: "Hotel that was reviewed in the web application",
      hideable: false,
      width: 200,
    },
    {
      field: "user_account_id",
      headerName: "User Account ID",
      description: "User that wrote a review in the web application",
      hideable: false,
      renderCell: (params) => params.value ? params.value.toString() : "Anonymous",
      width: 130,
    },
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
              sentiment: true,
              rate: true,
              review_text: true,
              created_at: false,
              updated_at: false,
              hotel_name_id: true,
              user_account_id: true,
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
