import React from "react";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <h5>DASHBOARD</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
