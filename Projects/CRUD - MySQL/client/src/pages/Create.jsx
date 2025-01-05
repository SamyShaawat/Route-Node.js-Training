import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/create-user", values)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-4 shadow">
        <h2 className="text-center mb-4">Create New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="form-control"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={values.age}
              onChange={(e) => setValues({ ...values, age: e.target.value })}
              className="form-control"
              placeholder="Enter age"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value = {values.gender}
              onChange={(e) => setValues({ ...values, gender: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
