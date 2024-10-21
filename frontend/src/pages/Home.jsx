import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Navbar from "../components/Navbar";
import ConfirmationDialog from "../components/ConfirmationDialog";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  const [cookies] = useCookies(["token", "role"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_HOST_API}/employees`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees", error);
        navigate("/login");
      }
    };

    if (!cookies.token) {
      navigate("/login");
    } else {
      fetchEmployees();
    }
  }, [cookies, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_HOST_API}/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const confirmDelete = (id) => {
    setEmployeeIdToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    handleDelete(employeeIdToDelete);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {cookies.role === "admin" && ( // Only show button for admins
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/create-employee")}
          >
            Add New Employee
          </button>
        )}
        <h2>Employee List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.position}</td>
                <td>
                  {cookies.role === "admin" && ( // Show edit button only for admins
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => navigate(`/edit-employee/${employee._id}`)}
                    >
                      Edit
                    </button>
                  )}
                  {cookies.role === "admin" && ( // Show delete button only for admins
                    <button
                      className="btn btn-danger"
                      onClick={() => confirmDelete(employee._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationDialog
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this employee?"
      />
    </div>
  );
};

export default Home;
