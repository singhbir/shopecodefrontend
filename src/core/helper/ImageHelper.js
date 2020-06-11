import React from "react";
import { API } from "../../backend";
import "./imagehelper.css";

const ImageHelper = ({ product }) => {
  let imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://images.pexels.com/photos/4033704/pexels-photo-4033704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
  return (
    <div className="rounded imghover">
      <img
        src={imageUrl}
        alt="photo"
        style={{
          height: "300px",
          width: "250px",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default ImageHelper;
