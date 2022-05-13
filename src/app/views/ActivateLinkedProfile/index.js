import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import history from "../../../components/History";
import {
  LinearProgress,
  Container,
  Backdrop,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { AppContext } from "../../../components/AppContext";

export const ActivateLinkedProfile = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const { objLogin } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const { pathname } = location;
  const username = pathname.replace("/activateLinkedProfile/", "");
  const payloadToActivateLinkedProfile = {
    usernameToActivateLink: username,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post("users/activateLinkingProfile", payloadToActivateLinkedProfile)
      .then((res) => {
        setLoading(false);
        const { ok, msg } = res.data;

        if (ok && msg === "Linked profile enabled succesfully") {
          enqueueSnackbar(msg, {
            variant: "success",
            autoHideDuration: 3000,
          });
          history.push("/login");
        } else {
          enqueueSnackbar(msg, {
            variant: "error",
            autoHideDuration: 3000,
          });
          history.push("/login");
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occured. Try again!", {
          variant: "error",
          autoHideDuration: 3000,
        });
        history.push("/login");
      });
  }, []);
  return (
    <>
      {/*En caso de que se esté consumiendo algún servicio se activa este loading en página completa*/}
      {loading ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <Container>
            <Grid container>
              <Grid item xs={12} textAlign="center">
                {/* <CircularProgress color="inherit" sx={{ mt: 2 }} /> */}
                <LinearProgress color="info" sx={{ mt: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ textAlign: "center" }}
                  gutterBottom
                >
                  Activating connection to requested user...
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Backdrop>
      ) : null}
    </>
  );
};
