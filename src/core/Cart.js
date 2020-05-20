import React from "react";
import Base from "./Base";
import { useState } from "react";
import { loadCart } from "./helper/cartHelper";
import Card from "./Card";
import { useEffect } from "react";
import StripeCheckout from "./StripeCheckout";
import Paymentb from "./Paymentb";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { ToastContainer, toast }  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
    console.log(loadCart())
  }, [reload]);

  const loadAllProducts = (products) => {
    
    const getFinalPrice = () => {
      return products.reduce((acc, currentvalue) => {
        return acc + currentvalue.count * currentvalue.price;
      }, 0)}

    return (
      <div>
        <h1>Total : ${getFinalPrice()}</h1>
        {products.map((product, index) => {
          return (
            <div className="mb-2">
            <Card
              key={index}
              product={product}
              removefromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-4">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3 className="text-white">No Products in cart</h3>
          )}
        </div>
        {!isAuthenticated() ? (
          <div className="col-4 offset-sm-2">
            <Link to="/signin" className="text-decoration-none">
              <button className="btn btn-block btn-warning">Signin</button>
            </Link>
          </div>
        ) : products.length > 0 ? (
          <div className="col-8">
            <div className="row">
              <div className="col-4">
                <h2 className="text-white">Pay using Stripe</h2>
                <StripeCheckout
                  products={products}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
              <div className="col-8">
                <h2 className="text-white">Pay using paypal</h2>
                <Paymentb
                  products={products}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            </div>
          </div>
        ) : (
          <h1> </h1>
        )}
      </div>
      <ToastContainer/>
    </Base>
  );
};

export default Cart;

{
  /* <div className="col-8">
          <div className="row">
            <div className="col-4">
              <h2 className="text-white">Pay using Stripe</h2>
              <StripeCheckout
                products={products}
                setReload={setReload}
                reload={reload}
              />
            </div>
            <div className="col-8">
              <h2 className="text-white">Pay using paypal</h2>
              <Paymentb
                products={products}
                setReload={setReload}
                reload={reload}
              />
            </div>
          </div>
        </div> */
}
