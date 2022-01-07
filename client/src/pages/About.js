import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();

  const handleBack = (e) => {
    navigate(-1);
  }

  return (
    <div className="container mt-5 text-left">
      <div className="row">
        <h3 style={{cursor: "pointer"}} onClick={handleBack}><i className="bi bi-arrow-left"></i></h3>
      </div>
      <div className="row">
        <div className="col-6">
          <h1 className="text-danger mt-5">404: Not Found</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <h4 className="mt-2">Full-Stuck Philosophy</h4>
          <p>Full-Stuck was initially invented when the author have to face the truthful reality that he, himself, just got stuck so many times by the obstacles in becoming a full-stack developer. Never waver, he pushes himself harder to break all the obstacles.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;