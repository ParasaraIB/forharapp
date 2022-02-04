import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navbar from "../components/Navbar";
import { addStakeholder } from "../store/actions/stakeholderAction";

const AddStakeholder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [institution, setInstitution] = useState("");

  const handleBack = () => {
    navigate(-1);
  }

  const inputName = (e) => {
    setName(e.target.value.toUpperCase());
  }

  const inputAcronym = (e) => {
    setAcronym(e.target.value.toUpperCase());
  }

  const inputInstitution = (e) => {
    setInstitution(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !acronym || !institution) {
      Swal.fire({
        icon: "error",
        title: "Invalid input",
        text: "Please fill all the field",
      });
    } else {
      const newStakeholder = {
        name,
        acronym,
        institution
      };
      dispatch(addStakeholder(newStakeholder, navigate));
    }
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
                <h5>ADD STAKEHOLDER</h5>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="container mt-5">
              <div className="row">
                <div className="col-1" style={{width: "10rem"}}>
                  <label style={{paddingTop: "0.4rem"}}>NAME</label>
                </div>
                <div className="col" style={{paddingRight: "4rem"}}>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Satker/Direktorat Name" aria-label="Name" aria-describedby="basic-addon1" onChange={inputName} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1" style={{width: "10rem"}}>
                  <label style={{paddingTop: "0.4rem"}}>ACRONYM</label>
                </div>
                <div className="col-2">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Acronym" aria-label="Acronym" aria-describedby="basic-addon1" onChange={inputAcronym} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1" style={{width: "10rem", marginRight: "0.75rem"}}>
                  <label>INSTITUTION</label>
                </div>
                <div className="col-1 form-check form-check-inline" style={{width: "10.3rem"}}>
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="BANK INDONESIA" onChange={inputInstitution} required />
                  <label className="form-check-label" htmlFor="inlineRadio1">BANK INDONESIA</label>
                </div>
                <div className="col-1 form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="KEMENTERIAN KEUANGAN" onChange={inputInstitution} required />
                  <label className="form-check-label" htmlFor="inlineRadio2">KEMENKEU</label>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 d-flex justify-content-end" style={{paddingRight: "4rem"}}>
                  <button type="submit" className="btn btn-dark">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStakeholder;