import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { updateCategory, getaCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [getRedirect, setGetRedirect] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    let value = event.target.value;
    setName(value);
  };

  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
      >
        <h4>Updated Successfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Failed to Update </h4>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(data.Error);
        } else {
          setName("");
          setError(false);
          setGetRedirect(true);
          setSuccess(true);
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const createCategoryForm = () => {
    return (
      <div className="form-group mt-3">
        <input
          onChange={handleChange}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3 mt-3"
        >
          Update Category
        </button>
      </div>
    );
  };
  return (
    <Base
      title="Update Category Here !"
      description="Welcome to Category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
