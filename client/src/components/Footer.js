import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container footer fixed-bottom">
      <div className="row mb-3">
        <div className="col text-center">
          <Link to="/about" style={{textDecoration: "none"}}>
            <span className="text-muted">Created by Full-Stuck Dev &copy; 2022</span>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Footer;