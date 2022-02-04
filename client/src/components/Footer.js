import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  }

  let linkStyle;
  if (hover) linkStyle = "text-muted";
  else linkStyle = "text-dark";

  return (
    <div className="container footer">
      <div className="row mb-3">
        <div className="col text-center">
          <Link to="/about" style={{textDecoration: "none"}}>
            <span className={linkStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>Created by Anak Magang &copy; 2022</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;