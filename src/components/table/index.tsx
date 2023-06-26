import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";
import { ActionButtonProps, NewButtonProps, PageProps } from "../pages";

const DataGridContainer = styled(DataGrid)`
  @media all and (max-width: 599px) {
    display: inline-grid !important;

    .MuiDataGrid-columnHeader {
      width: 100% !important;
      max-width: unset !important;
    }

    /* .MuiDataGrid-cell {
      width: 100% !important;
      max-width: unset !important;
      min-width: unset !important;
    } */

    /* .MuiDataGrid-row {
      width: auto;
    } */
  }
`;

type SnackBarProps = {
  open: boolean;
  message: string;
  color: "info" | "success" | "warning" | "error";
};

type TableProps = {
  data: any;
  headers: Array<GridColDef>;
  actionButtons: ActionButtonProps[];
  buttonNew: NewButtonProps;
};

export default function Table({
  data,
  headers,
  actionButtons,
  buttonNew,
}: TableProps) {
  const [rows, setRows] = useState(data);
  const [snackbar, setSnackbar] = useState<SnackBarProps>({
    open: false,
    message: "",
    color: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", color: "info" });
  };

  const columns: GridColDef[] = [
    ...headers,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }: any) => {
        return [
          ...actionButtons.map((button: any) => (
            <GridActionsCellItem
              key={id}
              icon={button.icon}
              label={button.label}
              onClick={button.action(id)}
              color={button.color}
            />
          )),
        ];
      },
    },
  ];

  useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.color}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid>
        <Button
          variant={buttonNew.variant}
          color={buttonNew.color}
          onClick={buttonNew.onClick}
          sx={{
            marginBottom: "12px",
          }}
        >
          {buttonNew.title}
        </Button>
      </Grid>
      <Grid>
        <DataGridContainer
          autoHeight
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 15]}
        />
      </Grid>
    </>
  );
}
