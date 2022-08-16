import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import history from "../../../components/History";
import {
  CardElement,
  Elements,
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
} from "@mui/material";
import CardInput from "./ChildrenComponent/CardInput";

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

const FormCheckout = () => {
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
  // State
  const [email, setEmail] = useState("");

  const stripe = useStripe();
  const elements = useElements();

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

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await axios.post("http://localhost:3000/sub", {
        payment_method: result.paymentMethod.id,
        email: email,
      });
      // eslint-disable-next-line camelcase
      const { client_secret, status } = res.data;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            console.log("There was an issue!");
            console.log(result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log("You got the money!");
            // Show a success message to your customer
          }
        });
      } else {
        console.log("You got the money!");
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  //return de vista
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Container>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <TextField
              label="Email"
              id="outlined-email-input"
              helperText={`Email you'll recive updates and receipts on`}
              margin="normal"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <CardInput />
            <div className={classes.div}>
              {/* <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
          Pay
        </Button> */}
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmitSub}
              >
                Subscribe
              </Button>
              <Button
                sx={{ mt: 3 }}
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => history.push("/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export const PaymentProcess = () => {
  return (
    <Elements stripe={stripePromise}>
      <FormCheckout />
    </Elements>
  );
};
