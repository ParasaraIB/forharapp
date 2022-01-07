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
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
