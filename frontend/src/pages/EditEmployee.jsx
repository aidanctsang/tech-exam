import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "../components/Navbar";
import ConfirmationDialog from "../components/ConfirmationDialog";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    position: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_HOST_API}/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee", error);
      }
    };

    fetchEmployee();
  }, [id, cookies.token]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_HOST_API}/employees/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      navigate("/home");
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  const confirmSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmUpdate = () => {
    setShowConfirm(false);
    handleSubmit();
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Edit Employee</h2>
        <form onSubmit={confirmSubmit}>
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
            Update Employee
          </button>
        </form>
      </div>

      <ConfirmationDialog
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmUpdate}
        message="Are you sure you want to update this employee?"
      />
    </div>
  );
};

export default EditEmployee;
