import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import { ToastContainer, toast }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });


  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const user = isAuthenticated() && isAuthenticated().user


  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
    
  }, []);

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success" onClick={onPurchase}>
              Pay with PayPal
            </button>
          </div>
        ) : (
          orcomponent()
        )}
      </div>
    );
  };

  const orcomponent = () => {
    if (isAuthenticated()) {
      return <h3 className="text-warning"></h3>;
    } else {
      return (
        <Link to="/signin">
          <button className="btn btn-warning">Signin</button>
        </Link>
      );
    }
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getFinalPrice(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false });
            toast.success("Payment Successfully Done")
            const orderData = {
              products: products,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
              user:user
            };
            createOrder(userId, token, orderData);
            cartEmpty(() => {
              console.log("Did we crash");
            });
            setReload(!reload);
          })
          .catch((error) => {
            toast.error('Payment Failed');
            setInfo({ ...info, loading: false, success: false });
          });
      })
      .catch();
  };

  const getFinalPrice = () => {
    return products.reduce((acc, currentvalue) => {
      return acc + currentvalue.count * currentvalue.price;
    }, 0);
  };

  return (
    <div>
      <h1 className="text-white"></h1>
      {showbtdropIn()}
      
    </div>
  );
};

export default Paymentb;
