import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { fetchStakeholders } from "../store/actions/stakeholderAction";

const Stakeholder = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);

  const pages = useSelector((state) => state.stakeholderReducer.pages);
  const stakeholders = useSelector((state) => state.stakeholderReducer.stakeholders);

  const getCurrentPage = (page=0) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    dispatch(fetchStakeholders(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <h5>STAKEHOLDER</h5>
            <div className="row mt-3">
              <div className="col d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-warning">
                  <strong>+ Add Stakeholder</strong>
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">SATUAN KERJA/DIREKTORAT JENDERAL</th>
                    <th scope="col">ACRONYM</th>
                    <th scope="col">INSTITUTION</th>
                    <th scope="col">INVOLVEMENT</th>
                  </tr>
                </thead>
                <tbody>
                  {stakeholders.map(stakeholder => {
                    return (
                      <tr key={stakeholder._id}>
                        <td>{stakeholder.name}</td>
                        <td>{stakeholder.acronym}</td>
                        <td>{stakeholder.institution}</td>
                        {stakeholder.involvement > 1 ? (<td>{stakeholder.involvement} TOPICS</td>) : (<td>{stakeholder.involvement} TOPIC</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination onPaginationClick={getCurrentPage} pages={pages} />
        </div>
      </div>
    </div>
  );
}

export default Stakeholder;