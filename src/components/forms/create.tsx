import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function FormCreate({
  title,
  id,
  handleSubmitPromise,
  getByIdPromise,
  children,
}: any) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    handleSubmitPromise()
      .then(() => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (id && getByIdPromise) {
      setLoading(true);
      getByIdPromise(id)
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [id]);

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Divider>
            <Typography variant="h4">{title}</Typography>
          </Divider>
          {loading && (
            <Item>
              <CircularProgress />
            </Item>
          )}
        </Grid>

        {!loading && <>{children}</>}
      </Grid>
    </form>
  );
}

export default FormCreate;
