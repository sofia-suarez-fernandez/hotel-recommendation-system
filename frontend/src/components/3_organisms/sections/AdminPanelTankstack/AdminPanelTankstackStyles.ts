import { makeStyles } from "tss-react/mui";

export const useAdminPanelStyles = makeStyles()((theme) => ({
  table: {
    border: "1px solid lightgray",
  },
  tbody: {
    borderBottom: "1px solid lightgray",
  },
  th: {
    borderBottom: "1px solid lightgray",
    borderRight: "1px solid lightgray",
    padding: "2px 4px",
  },
  header: {
    cursor: "pointer",
  },
}));
