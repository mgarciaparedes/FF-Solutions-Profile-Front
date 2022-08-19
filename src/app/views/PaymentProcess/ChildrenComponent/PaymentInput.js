import React from 'react';
import {PaymentElement, CardElement} from '@stripe/react-stripe-js';

export default function PaymentInput() {
  return (
    // <PaymentElement />
    <CardElement />
  );
}