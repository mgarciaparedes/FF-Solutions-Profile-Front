import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./ChildrenComponent/CheckoutForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import history from "../../../components/History";
import {
  Typography,
  Grid,
  Container,
  //   LinearProgress,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CssBaseline,
  Button,
  Alert,
} from "@mui/material";
import { AppContext } from "../../../components/AppContext";
import { useSnackbar } from "notistack";
import SyncLockTwoToneIcon from "@mui/icons-material/SyncLockTwoTone";
import stripe from "../../../assets/images/stripe.png";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    margin: "2em auto 1em",
  },
});

export const PaymentProcess = () => {
  const { objLogin } = useContext(AppContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({});
  const [loading, setLoading] = useState(false);
  const payload = { email: objLogin.email };
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    axios
      .post("/users/stripeFindSubscription", payload)
      .then((res) => {
        const { ok, msg } = res.data;
        setLoading(false);
        if (ok && msg === "Customer with subscription") {
          setSubscriptionData(res.data);
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        // alert("Error");
      });
  }, []);

  return (
    <>
      {!loading && isSubscribed ? (
        <>
          {/* Si llegó acá es porque existe una suscripción */}
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Container sx={{ mt: 25 }}>
              <Grid textAlign="center">
                <Typography
                  variant="button"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Subscription Info
                </Typography>
              </Grid>

              <Alert severity="info" sx={{ mt: 2 }}>
                Take a look at your billing details such as the day you start
                the subscription, the current period and the payment method.
              </Alert>
              <Card variant="outlined" sx={{ mt: 3 }}>
                <CardContent className={classes.content}>
                  <Grid container>
                    <Grid item xs={12} sx={{ mb: 3 }}>
                      <Typography
                        variant="button"
                        sx={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        Subscription
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography
                        variant="overline"
                        sx={{ color: "#99A3A4" }}
                      >
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
                      <Typography
                        variant="overline"
                        sx={{ color: "#99A3A4" }}
                      >
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
                      <Typography
                        variant="overline"
                        sx={{ color: "#99A3A4" }}
                      >
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
                        {subscriptionData.card.brand}****
                        {subscriptionData.card.last4}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid textAlign="center">
                <Button
                  sx={{ mt: 3 }}
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={() => history.push("/dashboard")}
                >
                  {"<"} Go Back
                </Button>
              </Grid>
            </Container>
          </ThemeProvider>
        </>
      ) : !loading && !isSubscribed ? (
        <>
          <Container>
            <Grid sx={{ marginTop: "80px" }}>
              <Grid item xs={12} textAlign="center">
                <Typography variant="h6" sx={{ color: "#707B7C" }} gutterBottom>
                  Subscribe to Blacklion
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent="space-between"
                textAlign="center"
              >
                <span style={{ fontSize: "40px" }}>1,00 US$</span>
                &nbsp;
                <span style={{ color: "#707B7C" }}>/monthly</span>
              </Grid>
              <Grid item xs={12} textAlign="center" sx={{ mt: 1 }}>
                <Typography variant="caption">
                  Enter your card details.
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Typography variant="caption">
                  Your subscription will start now
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign="center" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <b>Total due now $1,00</b>
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>{" "}
        </>
      ) : (
        //Acá se va cuando está cargando la vista
        //consume el servicio para saber si el cliente tiene
        //alguna suscripción activa o no
        <>
          <Grid
            sx={{
              textAlign: "center",
              mt: 40,
            }}
          >
            <Grid item xs={12} textAlign="center">
              {/* <Typography
            sx={{
              textAlign: "center",
              mt: 40,
            }}
          > */}
              {/* <SyncLockTwoToneIcon color="info" sx={{ fontSize: 70 }} /> */}
              <Box
                component="img"
                sx={{
                  // height: 200,
                  width: 0.5,
                  mb: 0,
                }}
                alt="stripe"
                src={stripe}
              />
              {/* </Typography> */}
            </Grid>
            <Grid item xs={12} textAlign="center">
              <CircularProgress color="info" sx={{ mt: 2 }} />
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
        </>
      )}
    </>
  );
};
