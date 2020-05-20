import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getMyProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getMyProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base
      title="Shop - e - Code"
      description="Welcome to the Heaven Store for coders "
    >
      <h1 className="mb-4 text-center">Your Shoping Arena</h1>
      <div className="row">
        <div className="row ml-5">
          {products.map((data, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={data} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
