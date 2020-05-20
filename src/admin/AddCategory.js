import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to Create Category</h4>;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //passing name as {name} because our backend is expecting response as json
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((error) => console.log(error));
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-dark btn-sm mb-3" to="/admin/dashboard">
          Admin Home{" "}
        </Link>
      </div>
    );
  };
  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            value={name}
            onChange={handleChange}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="btn btn-outline-info">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      className="container bg-info p-4"
      title="Create a category Here"
      description="Add a new Category"
    >
      <div className="row bg-white rounded">
        <div className="col-md-6 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
