import React,{useState} from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
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
import { useSnackbar } from "notistack";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const FourthView = ({ setView, email }) => {
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  return (
    <>
      {/* Titulo de ThirdView */}
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Subscription setup
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "#B2BABB" }}>
        Come on! You're almost done.
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm email={email} setView={setView} setLoadingPrevious={setLoadingPrevious} />
      </Elements>{" "}
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Button
            sx={{ mt: 2, mb: 2 }}
            onClick={() => setView(3)}
            startIcon={<KeyboardBackspaceIcon />}
            disabled={loadingPrevious}
          >
            Previous
          </Button>
        </Grid>
        {/* <Grid item xs={6} textAlign="right">
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            endIcon={<ArrowRightAltIcon />}
            onClick={() => setView(4)}
          >
            Submit
          </Button>
        </Grid> */}
      </Grid>
    </>
  );
};

export default FourthView;
