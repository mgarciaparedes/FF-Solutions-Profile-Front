import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./ChildrenComponent/CheckoutForm";
import { Typography, Grid, Container } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export const PaymentProcess = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .get("/users/stripeCreatePaymentIntent")
      .then((res) => {
        setClientSecret(res.data.client_secret);
      })
      .catch((error) => {
        alert("Error");
      });
  }, []);

  const options = {
    clientSecret: clientSecret,
  };
  return (
    <>
      <Container>
        <Grid sx={{ mt: 5 }}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6" sx={{ color: "#707B7C" }} gutterBottom>
              Subscribe to Blacklion
            </Typography>
          </Grid>
          <Grid item xs={12} justifyContent="space-between" textAlign="center">
            <span style={{ fontSize: "40px" }}>1,00 US$</span>
            &nbsp;
            <span style={{ color: "#707B7C" }}>/monthly</span>
          </Grid>
          <Grid item xs={12} textAlign="center" sx={{ mt: 1 }}>
          <Typography variant="caption">Enter your card details.</Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="caption">
              Your subscription will start now
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center" sx={{ mt: 1 }}>
            <Typography variant="body2"><b>Total due now $1,00</b></Typography>
          </Grid>
        </Grid>
      </Container>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
