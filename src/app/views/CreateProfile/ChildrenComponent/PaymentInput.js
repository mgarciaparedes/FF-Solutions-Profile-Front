import React from "react";
import { PaymentElement, CardElement } from "@stripe/react-stripe-js";

const style = {
  base: {
    iconColor: "#666EE8",
    color: "#31325F",
    lineHeight: "40px",
    fontWeight: 300,
    fontFamily: "Helvetica Neue",
    fontSize: "15px",

    "::placeholder": {
      color: "#CFD7E0",
    },
  },
};

export default function PaymentInput() {
  return (
    // <PaymentElement />
    <CardElement
      options={{
        style: {
          base: {
            color: "#FFF",
          },
        },
      }}
    />
  );
}
