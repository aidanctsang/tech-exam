import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    position: "",
  });
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/employees", employee, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error creating employee", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstname"
              value={employee.firstname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={employee.lastname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Position</label>
            <input
              type="text"
              name="position"
              value={employee.position}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
