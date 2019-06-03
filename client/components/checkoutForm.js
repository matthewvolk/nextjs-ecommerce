import React, { Component } from 'react';
import { useState } from 'react'
import { injectStripe } from "react-stripe-elements-universal";
import { CardElement } from "react-stripe-elements-universal";

const CheckoutForm = ({ totalPrice, namesOfPurchasedServices, stripe }) => {
  const SUBTOTAL = totalPrice
  const TAX_RATE = 0.08
  const GRAND_TOTAL = (SUBTOTAL * (TAX_RATE + 1)).toFixed(2)

  const [status, setStatus] = useState("default");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    if (stripe) {
      try {
        const { token } = await stripe.createToken();

        /**
         * @todo better error handling for: Empty credit card forms
         * @todo better error handling for: Orders that are < $0.50
         */
        if (!token) throw {message: "Credit card token is undefined, this is likely due to not entering valid credit card information"};
        if (GRAND_TOTAL < 0.50) throw {message: "Minimum order is $0.50"};
        
        console.log("STRIPE TOKEN:", token);
        const res = await fetch(`http://localhost:3001/api/v1/checkout`, {
          method: "POST",
          body: JSON.stringify({
            // convert to cents for stripe
            amount: GRAND_TOTAL * 100,
            token: token.id,
            description: `Charge user ${GRAND_TOTAL} for ${namesOfPurchasedServices.join(', ')}`
          }),
          headers: {
            "content-type": "application/json"
          }
        });

        if (!res.ok) {
          setStatus("error");
          console.log("ERROR with Stripe API Response");
        }

        const json = await res.json();
        console.log("STRIPE PURCHASE STATUS:", json);
        // clearCart();
        setStatus("success");
        console.log("STRIPE SUCCESS")
      } catch ({ message }) {
        setStatus("error");
        throw new Error(message);
      }
    }
  }

  return (
    <div style={{border: "1px solid red"}}>

      <div><span><strong>Subtotal</strong>: ${SUBTOTAL}</span></div>
      <div><span><strong>Tax</strong>: ${(SUBTOTAL * TAX_RATE).toFixed(2)}</span></div>
      <div><span><strong>Grand Total</strong>: ${GRAND_TOTAL}</span></div>

      <form onSubmit={handleSubmit}>
        <CardElement/>
        <button 
          type="submit"
        >
          {status === "default" && "Checkout"}
          {status === "submitting" && "Submitting ..."}
          {status === "success" && "Payment Complete!"}
          {status === "error" && "Error!"}
        </button>
        <br /><span style={{color: "red"}}>{(status === "error" && GRAND_TOTAL >= 0.50) && "We couldn't validate your credit card. Please check that you entered valid credit card information."}</span>
        <br /><span style={{color: "red"}}>{(status === "error" && GRAND_TOTAL < 0.50) && "Uh oh! You must have at least $0.50 to check out."}</span>
      </form>
    </div>
  )
}

export default injectStripe(CheckoutForm)