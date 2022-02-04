import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

const AddTopic = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <div className="row">
              <div className="col-1 my-auto" style={{width: "3rem"}}>
                <h3 onClick={handleBack} style={{cursor: "pointer"}}>
                  <i className="bi bi-arrow-left"></i>
                </h3>
              </div>
              <div className="col my-auto">
                <h5>ADD TOPIC</h5>
              </div>
            </div>
            <div className="row mt-3">
              <a href="https://documenter.getpostman.com/view/12540213/UVRGFjS4#6925fde4-2b2e-4fe6-bdf4-1b2549596381" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>Add Topic API</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTopic;