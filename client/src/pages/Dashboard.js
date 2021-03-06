import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <h5>DASHBOARD</h5>
            <div className="row mt-5">
              <p><strong>N.B.</strong> To hit the APIs using API Testing App, change http://localhost:3000 in API Docs to https://forhar-app.herokuapp.com</p>
            </div>
            <div className="row">
              <a href="https://documenter.getpostman.com/view/12540213/UVRGFjS4" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>API Docs</a>
            </div>
            <div className="row">
              <a href="https://github.com/ParasaraIB/forharapp" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>Source Code</a>
            </div>
            <div className="row">
              <a href="https://www.figma.com/file/QBU188jk08rVQRaWqGisbd/ForharApp?node-id=0%3A1" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>Figma Design</a>
            </div>
            <div className="row">
              <a href="https://drive.google.com/file/d/1mdTFqPxjW1Bk4ngjUpUQQ6AUPSRUoz4X/view?usp=sharing" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>ERD</a>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
