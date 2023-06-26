import { GlobalContext } from "@/src/contexts/GlobalProvider";
import { Alert, Snackbar } from "@mui/material";
import { ReactNode, useContext } from "react";

import ResponsiveDrawer from "../components/drawer";

export default function Layout({ ...props }: any) {
  const { alert, handleCloseAlert } = useContext(GlobalContext);

  const handleCloseSnackbar = () => {
    handleCloseAlert();
  };

  return (
    <>
      <ResponsiveDrawer>
        {alert?.open && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={alert.open}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert onClose={handleCloseSnackbar} severity={alert.status}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
        {props.children}
      </ResponsiveDrawer>
    </>
  );
}
