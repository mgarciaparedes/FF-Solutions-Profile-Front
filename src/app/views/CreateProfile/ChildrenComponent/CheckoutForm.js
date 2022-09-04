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
  FormCon,
} from "@mui/material";
import PaymentInput from "./PaymentInput";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import LockIcon from "@mui/icons-material/Lock";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Streetview } from "@mui/icons-material";

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

const CheckoutForm = ({ email, setView, setLoadingPrevious }) => {
  //     const stripe = useStripe();
  //     const elements = useElements();

  //     const handleSubmit = async (e) => {
  //         e.preventDefault();

  //         const { error, paymentMethod } = await stripe.createPaymentMethod({
  //           type: "card",
  //           card: elements.getElement(CardElement),
  //         });

  //         if (!error) {
  //           console.log(paymentMethod);
  //         } else {
  //           console.log(error);
  //         }
  //       };

  //       return (
  //         <form onSubmit={handleSubmit}>
  //         <CardElement />
  //         <button type="submit">Buy</button>
  //       </form>
  //       );
  //   };

  const classes = useStyles();

  const [showSub, setShowSub] = useState(true); //show message with status subscription

  const stripe = useStripe();
  const elements = useElements();

  const { enqueueSnackbar } = useSnackbar(); //sweetalert status subscription
  const [showloadSub, setShowloadsub] = useState(false); //show loading subscription

  //   const handleSubmitPay = async (event) => {
  //     if (!stripe || !elements) {
  //       // Stripe.js has not yet loaded.
  //       // Make sure to disable form submission until Stripe.js has loaded.
  //       return;
  //     }

  //     const res = await axios.post("http://localhost:3000/pay", { email: email });

  //     const clientSecret = res.data["client_secret"];

  //     const result = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //         billing_details: {
  //           email: email,
  //         },
  //       },
  //     });

  //     if (result.error) {
  //       // Show error to your customer (e.g., insufficient funds)
  //       console.log(result.error.message);
  //     } else {
  //       // The payment has been processed!
  //       if (result.paymentIntent.status === "succeeded") {
  //         console.log("Money is in the bank!");
  //         // Show a success message to your customer
  //         // There's a risk of the customer closing the window before callback
  //         // execution. Set up a webhook or plugin to listen for the
  //         // payment_intent.succeeded event that handles any business critical
  //         // post-payment actions.
  //       }
  //     }
  //   };

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // console.log("payment",elements.getElement(PaymentElement));
    // console.log("payment",elements.getElement(CardElement));

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
          setLoadingPrevious(false);
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
                enqueueSnackbar("Successful subscription!", {
                  variant: "success",
                  autoHideDuration: 3000,
                });
                setView(5);
              }
            });
          } else {
            // console.log("You got the money!");
            
            setShowloadsub(false);
            enqueueSnackbar("Successful subscription!", {
              variant: "success",
              autoHideDuration: 3000,
            });
            setView(5);
            // No additional information was needed
            // Show a success message to your customer
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
