import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [cookies, setCookie] = useCookies(["token"]);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HOST_API}/login`,
        { ...inputValue },
        { withCredentials: true }
      );
      console.log("role " + data.role);
      if (data.success && data.token) {
        handleSuccess(data.message);
        setCookie("token", data.token, {
          path: "/home",
          secure: false,
          sameSite: "lax",
        });
        setCookie("role", data.role, {
          path: "/home",
          secure: false,
          sameSite: "lax",
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      handleError("Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            placeholder="Enter your email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              className="form-control"
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
