import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();

  const loggedInPic = jwt_decode(localStorage.getItem("access_token"));

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <div className="dropdown mt-4">
          <div
            style={{ cursor: "pointer" }}
            href="#submenu2"
            data-bs-toggle="collapse"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          >
            <img
              src="https://www.choicemedwaste.com/wp-content/uploads/default-user-avatar-dc6f2da9.gif"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className="d-none d-sm-inline mx-1 ps-2">
              {loggedInPic.full_name}
            </span>
          </div>
          <div className="mt-2">
            <ul
              className="collapse nav flex-column ms-1"
              id="submenu2"
              data-bs-parent="#menu"
            >
              <li className="w-100 mt-2">
                <span className="d-none d-sm-inline">
                  <small>{loggedInPic.institution}</small>
                </span>
              </li>
              <li className="mt-2">
                <span className="d-none d-sm-inline small fs-6">
                  <small>{loggedInPic.satker_dirjen.name}</small>
                </span>
              </li>
              <li
                className="mt-4"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-left"></i>
                <span className="ms-2 d-none d-sm-inline">Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <hr
          style={{
            height: "2px",
            width: "100%",
            borderWidth: 0,
            color: "red",
            backgroundColor: "white",
          }}
        ></hr>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link align-middle px-0">
              <i className="bi bi-microsoft" style={{ color: "white" }}></i>
              <span className="ms-2 d-none d-sm-inline text-white">
                Dashboard
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pic" className="nav-link align-middle px-0">
              <i className="bi bi-building" style={{ color: "white" }}></i>
              <span className="ms-2 d-none d-sm-inline text-white">
                Stakeholder
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pic" className="nav-link align-middle px-0">
              <i className="bi bi-person-fill" style={{ color: "white" }}></i>
              <span className="ms-2 d-none d-sm-inline text-white">PIC</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pic" className="nav-link align-middle px-0">
              <i className="bi bi-archive-fill" style={{ color: "white" }}></i>
              <span className="ms-2 d-none d-sm-inline text-white">
                Archive
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pic" className="nav-link align-middle px-0">
              <i className="bi bi-trash-fill" style={{ color: "white" }}></i>
              <span className="ms-2 d-none d-sm-inline text-white">Trash</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
