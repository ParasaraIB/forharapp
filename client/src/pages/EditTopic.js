import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchTopic } from "../store/actions/topicAction";

const EditTopic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const topic = useSelector((state) => state.topicReducer.topic);

  const handleBack = (e) => {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(fetchTopic(id));
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
              <h5>EDIT TOPIC</h5>
            </div>
          </div>
          <div className="row mt-3">
            <a href="https://documenter.getpostman.com/view/12540213/UVRGFjS4#9a3069a0-f0ff-41ba-86e8-cacde9338e23" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>Edit Topic API</a>
          </div>
          <div className="row mt-3">
            <pre>{JSON.stringify(topic, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTopic;