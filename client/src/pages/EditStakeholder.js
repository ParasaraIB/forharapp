import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchStakeholder } from "../store/actions/stakeholderAction";

const EditStakeholder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const stakeholder = useSelector((state) => state.stakeholderReducer.stakeholder);

  const handleBack = (e) => {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(fetchStakeholder(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="row">
            <div className="col-1 my-auto" style={{ width: "3rem" }}>
              <h3 onClick={handleBack} style={{ cursor: "pointer" }}>
                <i className="bi bi-arrow-left"></i>
              </h3>
            </div>
            <div className="col my-auto">
              <h5>EDIT STAKEHOLDER</h5>
            </div>
          </div>
          <div className="row mt-3">
            <a href="https://documenter.getpostman.com/view/12540213/UVRGFjS4#bdd81111-668a-49e0-a2b8-d6c75e10f9b6" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>Edit Stakeholder API</a>
          </div>
          <div className="row mt-3">
            <pre>{JSON.stringify(stakeholder, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStakeholder;