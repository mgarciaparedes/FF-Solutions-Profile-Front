import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import history from "../../../components/History";
import {
  Typography,
  Grid,
  Container,
  LinearProgress,
  Card,
  CardContent,
  CssBaseline,
  Button,
} from "@mui/material";
import { AppContext } from "../../../components/AppContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#dfb05a", light: "#42a5f5" },
  },
});

export const SubscriptionInfo = () => {
  const { objLogin } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  //   const [isSubscribed, setIsSubscribed] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState({});
  const [cardInfo, setCardInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const payload = { email: objLogin.email };

  useEffect(() => {
    axios
      .post("/users/stripeFindSubscription", payload)
      .then((res) => {
        const { ok, msg } = res.data;
        setLoading(false);
        if (ok && msg === "Customer with subscription") {
          setSubscriptionData(res.data);
          setCardInfo(res.data.card);
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Something went wrong. Try again!", {
          variant: "error",
          autoHideDuration: 3000
        });
        history.push("/dashboard");

      });
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {!loading ? (
          <>
            {/* Si llegó acá es porque existe una suscripción */}

            <Container sx={{ mt: 25 }}>
              <Grid>
                {/* <Typography
                  variant="button"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Subscription Info
                </Typography> */}
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Subscription info
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body2" sx={{ mb: 2, color: "#B2BABB" }}>
                  Take a look at your billing details such as the day you start
                  the subscription, the current period and the payment method.
                </Typography>
              </Grid>

              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} sx={{ mb: 3 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Subscription
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="overline" sx={{ color: "#99A3A4" }}>
                        Current Plan:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        variant="overline"
                        sx={{ color: "#707B7C", fontWeight: "bold" }}
                      >
                        Blacklion Sub.
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="overline" sx={{ color: "#99A3A4" }}>
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        variant="overline"
                        sx={{
                          color:
                            subscriptionData.status === "active"
                              ? "#229954"
                              : "#CB4335",
                          fontWeight: "bold",
                          backgroundColor:
                            subscriptionData.status === "active"
                              ? "#ABEBC6"
                              : "#F5B7B1",
                          padding: "5px 15px 5px 15px",
                          borderRadius: "5px",
                        }}
                      >
                        {subscriptionData.status}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="overline" sx={{ color: "#99A3A4" }}>
                        Period Start:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        variant="overline"
                        sx={{ color: "#707B7C", fontWeight: "bold" }}
                      >
                        {subscriptionData.current_period_start}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="overline" sx={{ color: "#99A3A4" }}>
                        Period End:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        variant="overline"
                        sx={{ color: "#707B7C", fontWeight: "bold" }}
                      >
                        {subscriptionData.current_period_end}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="overline" sx={{ color: "#99A3A4" }}>
                        Payment Method:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        variant="overline"
                        sx={{ color: "#707B7C", fontWeight: "bold" }}
                      >
                        {cardInfo.brand}****
                        {cardInfo.last4}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid textAlign="center">
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mt: 2,
                    mb: 2
                  }}
                  startIcon={<KeyboardBackspaceIcon />}
                  onClick={() => history.push("/dashboard")}
                >
                  Go back
                </Button>
              </Grid>
            </Container>
          </>
        ) : (
          //Acá se va cuando está cargando la vista
          //consume el servicio para saber si el cliente tiene
          //alguna suscripción activa o no
          <>
            <Container>
              <Grid
                container
                sx={{
                  textAlign: "center",
                  mt: 50,
                }}
              >
                <Grid item xs={12} textAlign="center">
                  <LinearProgress color="primary" />
                </Grid>
              </Grid>

              <Typography
                variant="caption"
                display="block"
                sx={{ textAlign: "center" }}
                gutterBottom
              >
                Checking your info...
              </Typography>
            </Container>
          </>
        )}
      </ThemeProvider>
    </>
  );
};
