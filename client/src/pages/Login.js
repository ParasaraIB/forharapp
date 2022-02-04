import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";

import { loginPic, clearToken } from "../store/actions/picAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("johndoe@forhar.id");
  const [password, setPassword] = useState("12345");

  const inputEmail = (e) => {
    setEmail(e.target.value);
  }

  const inputPassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please fill all the field",
      });
    } else {
      const loginPayload = {
        email,
        password,
      };

      dispatch(loginPic(loginPayload));
      setEmail("");
      setPassword("");
    }
  }

  const access_token = useSelector((state) => state.picReducer.access_token);
  useEffect(() => {
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      dispatch(clearToken());
      navigate("/dashboard")
      Swal.fire({
        icon: "info",
        iconColor: "#A5DC86",
        title: "Welcome back!",
        html: '<i>DPPT Greater and More Significant!</i>',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }, [access_token, dispatch, navigate]);

  return (
    <div>
      <div className="container d-flex align-items-center min-vh-100">
        <div className="card mx-auto" style={{ width: "25rem" }}>
          <form onSubmit={handleSubmit}>
            <div className="m-3 row">
              <div className="col">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={inputEmail}
                />
              </div>
            </div>
            <div className="m-3 row">
              <div className="col">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={inputPassword}
                />
              </div>
            </div>
            <div className="m-3 row">
              <div className="col d-flex justify-content-end">
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
