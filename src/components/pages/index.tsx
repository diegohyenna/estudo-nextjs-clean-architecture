import Table from "@/src/components/table";
import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { IUseCasesMethods } from "@/src/core/application/interfaces/base.interface";
import { StatusReturn } from "@/src/core/infra/http";
import { CircularProgress, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useContext, useEffect, useState } from "react";

type ActionButton = {
  icon: React.JSX.Element;
  label: string;
  color: string;
  action?: Function | undefined;
};

type PageProps = {
  data: any;
  setData: React.Dispatch<any>;
  headers: Object;
  actionButtons: ActionButton[];
  buttonNew: {
    title: string;
    variant: string;
    color: string;
    onClick: Function;
  };
  useCases: IUseCasesMethods;
};

function PageIndex({
  data,
  setData,
  headers,
  actionButtons,
  buttonNew,
  useCases,
}: PageProps) {
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  const { handleOpenAlert } = useContext(GlobalContext);

  const [id, setId] = useState(0);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (id: number) => () => {
    setId(id);
    setOpenDialog(true);
  };

  actionButtons = actionButtons.map((button) => {
    if (!button.action) {
      button.action = handleOpenDialog;
    }
    return button;
  });

  const handleSubmitDialog = () => {
    useCases.useCaseDelete
      .execute(id)
      .then((res: any) => {
        setData(data.filter((dt: any) => dt.id !== id));
        handleOpenAlert({
          open: true,
          message: res?.message || "Sucesso!",
          status: "success",
        });
      })
      .catch((res: any) => {
        handleOpenAlert({
          open: true,
          message: res?.message || "Houve algum erro",
          status: "error",
        });
      });
    setOpenDialog(false);
  };

  useEffect(() => {
    useCases.useCaseList
      .execute()
      .then((res: any) => {
        setData(res.map((data: any) => data.toJSON()));
        setLoading(false);
      })
      .catch((res: StatusReturn) => {
        setData([]);
        setLoading(false);
        handleOpenAlert({ open: true, status: "error", message: res.message });
      });
  }, []);

  return (
    <>
      {loading && (
        <ListItem>
          <CircularProgress />
        </ListItem>
      )}
      {!loading && (
        <Table
          data={data}
          headers={headers}
          actionButtons={actionButtons}
          buttonNew={buttonNew}
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Deletar registro!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja deletar esse registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmitDialog}
          >
            Sim
          </Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PageIndex;
