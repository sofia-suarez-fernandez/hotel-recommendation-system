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
          rowParams.row.review_title,
          rowParams.row.review_text,
          rowParams.row.created_at,
          rowParams.row.created_by,
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
          aria-label="Edit review"
          onClick={handleEditClick}
          disabled={apiRef.current.getRowMode(id) === "edit"}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          color="primary"
          aria-label="Save changes"
          onClick={handleSaveClick}
          disabled={apiRef.current.getRowMode(id) === "view"}
        >
          <SaveIcon />
        </IconButton>

        <IconButton
          color="primary"
          aria-label="Cancel changes"
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
      headerAlign: "center",
      headerClassName: classes.header,
      description:
        "Include (🟩) / Don't include (🟥) the review in the recommender system",
      hideable: false,
      valueOptions: [
        { value: true, label: "Included 🟩" },
        { value: false, label: "Not included 🟥" },
      ],
      type: "singleSelect",
      editable: true,
      width: 100,
    },
    {
      field: "sentiment",
      headerName: "Sentiment",
      headerAlign: "center",
      headerClassName: classes.header,
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
      headerAlign: "center",
      headerClassName: classes.header,
      hideable: false,
      description: "From 1 to 5",
      editable: false,
      renderCell: (params) =>
        params.value ? Number(params.value).toFixed(2) : "N/A",
      width: 70,
    },
    {
      field: "created_by",
      headerName: "Created By",
      headerAlign: "center",
      headerClassName: classes.header,
      hideable: true,
      description:
        "Who created the review: User or System based on Sentiment Analysis",
      editable: false,
      renderCell: (params) => (params.value === 1 ? "System" : "User"),
      width: 100,
    },
    {
      field: "review_title",
      headerName: "Review Title",
      headerAlign: "center",
      headerClassName: classes.header,
      description: "Review Titles in the web application",
      hideable: false,
      width: 350,
    },
    {
      field: "review_text",
      headerName: "Review Text",
      headerAlign: "center",
      headerClassName: classes.header,
      description: "Review in the web application",
      hideable: false,
      width: 350,
    },
    {
      field: "created_at",
      headerName: "Created At",
      headerAlign: "center",
      headerClassName: classes.header,
      description: "Time the review was created in the web application",
      width: 150,
      hideable: true,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      headerAlign: "center",
      headerClassName: classes.header,
      description: "Last time the review was updated in the web application",
      width: 150,
      hideable: true,
    },
    {
      field: "hotel_name_id",
      headerName: "Hotel Name",
      headerAlign: "center",
      headerClassName: classes.header,
      description: "Hotel that was reviewed in the web application",
      hideable: false,
      width: 150,
    },
    {
      field: "user_account_id",
      headerName: "UserAccount ID",
      headerAlign: "center",
      headerClassName: classes.header,
      description: "User that wrote a review in the web application",
      hideable: true,
      renderCell: (params) =>
        params.value ? params.value.toString() : "Anonymous",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      headerClassName: classes.header,
      description: "Edit, save or cancel changes",
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
    <div style={{ width: "100%" }} aria-label="Table of Reviews">
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
              created_by: true,
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
        slotProps={{
          row: { role: "row" },
          noRowsOverlay: { role: "alert" },
          noResultsOverlay: { role: "alert" },
          cell: { role: "gridcell" },
        }}
        aria-label="Table of Reviews"
        rowCount={rows.length}
      />
    </div>
  );
};
