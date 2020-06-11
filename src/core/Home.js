import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getMyProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [w, sW] = useState(window.innerWidth);

  window.addEventListener("resize", function () {
    sW(window.innerWidth);
  });

  const loadAllProducts = () => {
    setLoad(true);
    getMyProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
        setLoad(false);
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
      {!load ? (
        <div className="row">
          <div className={w > 629 ? "row ml-5" : "row"}>
            {products.map((data, index) => {
              return (
                <div
                  key={index}
                  className="col-md-6 col-sm-10 col-lg-4 mb-4"
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="600"
                >
                  <Card product={data} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div class="d-flex justify-content-center text-warning">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </Base>
  );
};

export default Home;
