import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const cardTitle = product ? product.name : "A photo from pexels";
  const carddescription = product ? product.description : "Product Description";
  const cardprice = product ? product.price : "Hey its free";

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div
      className="card text-white bg-dark  border border-light text-center"
      style={{width:"80%"}}
    >
      <ImageHelper product={product} />
      <div className="card-header lead bg-warning">{cardTitle}</div>
      
      <div className="card-body">
        {getARedirect(redirect)}
        
        <p className="lead bg-danger font-weight-normal text-wrap rounded ">
          {carddescription}
        </p>
        <p className="btn rounded  btn-sm px-4 btn-block" style={{backgroundColor:"#66FCF1"}}>${cardprice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removefromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
