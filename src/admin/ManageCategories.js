import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = () => {
  const { user, token } = isAuthenticated();
  const [categories, setCategories] = useState([]);

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const delCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage Categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Categories List</h2>

          {categories.map((category, index) => {
            return (
              <div className="row text-center mb-2 ">
                <div key={index} className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      delCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
