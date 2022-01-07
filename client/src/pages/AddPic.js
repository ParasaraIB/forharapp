import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddPic = () => {
  const navigate = useNavigate();

  const handleBack = (e) => {
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
                <h5>ADD PIC</h5>
              </div>
            </div>
          </div>
          <form>
            <div className="container mt-5">
              <div className="row">
                <div className="col-1" style={{width: "7rem"}}>
                  <label style={{paddingTop: "0.4rem"}}>FULL NAME</label>
                </div>
                <div className="col-1" style={{width: "20rem"}}>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Full name" aria-label="Full name" aria-describedby="basic-addon1" />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-1" style={{width: "7rem"}}>
                  <label style={{paddingTop: "0.4rem"}}>USERNAME</label>
                </div>
                <div className="col-1" style={{width: "20rem"}}>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    <span className="input-group-text" id="basic-addon2">@forhar.id</span>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-10 d-flex justify-content-end">
                  <button type="submit" className="btn btn-dark">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPic;