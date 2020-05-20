import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutPayment from "react-stripe-checkout";
import { ToastContainer, toast }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { API } from "../backend";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    error: "",
    success: false,
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const user = isAuthenticated() && isAuthenticated().user;

  const getFinalPrice = () => {
    return products.reduce((acc, currentvalue) => {
      return acc + currentvalue.count * currentvalue.price;
    }, 0);
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
      user
    };
    const headers = {
      "Content-type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if(response.status === 400){
          toast.error("Stripe doesnot support Indian region")
        }else{
          toast.success("Thanks for Shopping with Us!!")
          cartEmpty(() => {
          console.log("Cart Empty successfull");
        })
        setReload(!reload)
      }})
      .catch((error) => {
        console.log(error);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutPayment
        stripeKey={process.env.REACT_APP_STRIPEKEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Cool Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutPayment>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return <div>{showStripeButton()}</div>;
};

export default StripeCheckout;
