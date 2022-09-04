import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import history from "../../../../components/History";
import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Button,
  Container,
  Card,
  CardContent,
  TextField,
  CssBaseline,
  Alert,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import PaymentInput from "./PaymentInput";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import LockIcon from "@mui/icons-material/Lock";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteIcon from "@mui/icons-material/Delete";

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

const CheckoutForm = ({ email, setView, setLoadingPrevious, username, name, password }) => {
  const classes = useStyles();

  const stripe = useStripe();
  const elements = useElements();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //sweetalert status subscription
  const [showloadSub, setShowloadsub] = useState(false); //show loading subscription

  //Botón cerrar notificación
  const action = (key) => (
    <>
      <IconButton
        variant="outlined"
        sx={{
          color: "white",
        }}
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setShowloadsub(true);
    setLoadingPrevious(true);

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (email === "") {
      enqueueSnackbar("Email is required", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setShowloadsub(false);
      setLoadingPrevious(false);
    }

    if (result.error) {
      //   console.log(result.error.message);
      enqueueSnackbar(result.error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
      setShowloadsub(false);
      setLoadingPrevious(false);
    } else {
      await axios
        .post("/users/subscriptionStripe", {
          payment_method: result.paymentMethod.id,
          email: email,
        })
        .then((res) => {
          console.log(res);

          // eslint-disable-next-line camelcase
          const { client_secret, status } = res.data;

          if (status === "requires_action") {
            stripe.confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                // console.log("There was an issue!");
                // console.log(result.error);
                // Display error message in your UI.
                // The card was declined (i.e. insufficient funds, card has expired, etc)
                enqueueSnackbar("Something happened, please try again", {
                  variant: "error",
                  autoHideDuration: 2000,
                });
              } else {
                // console.log("You got the money!");
                // Show a success message to your customer
                createProfile();
              }
            });
          } else {
            // console.log("You got the money!");

            createProfile();
          }
        })
        .catch((error) => {
          const { ok, msg } = error.response.data;
          setShowloadsub(false);
          setLoadingPrevious(false);

          if (
            !ok &&
            msg ===
              "The email is already associated with an active subscription"
          ) {
            enqueueSnackbar(msg, {
              variant: "error",
              autoHideDuration: 2000,
            });
          } else {
            enqueueSnackbar("Something happened, please try again", {
              variant: "error",
              autoHideDuration: 2000,
            });
          }
        });
    }
  };

  // Funcion que envia objeto de valores al console.---------------------------------------------------
  const createProfile = () => {
    // const { fullName, userName, email, serialNumber, password } = values;

    const payload = {
      name: name,
      username: username,
      email: email,
      // serialNumber: serialNumber,
      password: password,
    };

    axios
      .post(`/users/saveNewUser`, payload)
      .then((res) => {
        const { ok, msg } = res.data;
        if (ok && msg === "User created succesfully.") {
          enqueueSnackbar(msg, {
            variant: "success",
            autoHideDuration: 3000,
            action,
          });
          enqueueSnackbar("Payment completed succesfully", {
            variant: "success",
            autoHideDuration: 3000,
            action,
          });
          setView(5);
          setLoadingPrevious(false);
          setShowloadsub(false);
          // history.push("/login");
        }
      })
      .catch((e) => {
        setLoadingPrevious(false);
        setShowloadsub(false);
        //catch es la respuesta de error en la promesa
        /*Sí los servicios están OFF, retornamos este mensaje*/
        if (e.response === undefined) {
          //Si hay error se detiene el progress bar
          // setLoading(false);
          enqueueSnackbar("An error ocurred. Please try again!", {
            variant: "error",
            autoHideDuration: 3000,
            action,
          });
          return 1;
        }

        /*Si ocurre algo en el request, retoramos esto*/
        const { msg, ok } = e.response.data;

        if (msg === undefined || msg === null || msg === "") {
          // setLoading(false);
          enqueueSnackbar("An error ocurred. Please try again!", {
            variant: "error",
            autoHideDuration: 3000,
            action,
          });
          return 1;
        }

        if (!ok) {
          // setLoading(false);
          enqueueSnackbar(msg, {
            variant: "error",
            autoHideDuration: 3000,
            action,
          });
          return 1;
        }
      });
  };

  //return de vista
  return (
    <>
      {/*First Section Payment Method*/}
      <Typography variant="button" sx={{ fontWeight: "bold", mt: 3 }}>
        Payment Method
      </Typography>
      <div
        style={{
          marginTop: "10px",
          padding: "18px 5px 18px",
          border: "1px solid #707070",
          borderRadius: "3px",
        }}
      >
        <PaymentInput />
      </div>

      {/*Second Section Billing Details*/}
      <Typography variant="button" sx={{ fontWeight: "bold", mt: 5 }}>
        Billing Details
      </Typography>
      <TextField
        id="outlined-email-input"
        label="Email address"
        margin="normal"
        variant="outlined"
        type="email"
        required
        value={email}
        disabled
        fullWidth
        helperText={"Given in the first step"}
        sx={{ mt: 2 }}
      />
      <TextField
        id="outlined-email-input"
        label="Country of residence"
        margin="normal"
        variant="outlined"
        type="text"
        required
        value={"United States of America"}
        disabled
        fullWidth
        sx={{ mt: 2, mb: 3 }}
      />

      <Grid container sx={{ mt: 3 }}>
        <Card sx={{ width: 1 }}>
          <CardContent>
            <Grid container>
              {/*Título*/}
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Your subscription
                </Typography>
              </Grid>

              {/*Sección Billing Cycle*/}
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Billing Cycle
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <RadioButtonCheckedIcon sx={{ color: "primary.main" }} />
              </Grid>
              <Grid item xs={11}>
                <Typography
                  sx={{ fontSize: 14, pt: 0.4 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Monthly
                </Typography>
              </Grid>

              {/*Sección Subscription Product*/}
              <Grid item xs={8} sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Blacklion Subscription
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ mt: 3 }} textAlign="right">
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  $1.00
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  USD per month
                </Typography>
              </Grid>

              {/*Payment resume*/}
              <Grid item xs={6} sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Due today
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ mt: 3 }} textAlign="right">
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  $1.00 USD
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <div className={classes.div}>
        {/* <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
          Pay
        </Button> */}
        <LoadingButton
          sx={{ mt: 3 }}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmitSub}
          loading={showloadSub}
          fullWidth
          startIcon={<LockIcon />}
        >
          Subscribe now
        </LoadingButton>
      </div>
    </>
  );
};

export default CheckoutForm;
