import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { style } from "glamor";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { fetchPics, setPage } from "../store/actions/picAction";
import { useFetchStakeholders } from "../hooks/useFetch";

const Pic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hoverStyle = {backgroundColor: "#ffffff", height: "30px", width: "100%", padding: "6px", fontsize: "16px", transition: "all ease .5s", ":hover": {cursor: "pointer", backgroundColor: "#E0E0E0", color: "#000000" }};
  
  const [, setCurrentPage] = useState("");
  const [search, setSearch] = useState("");
  const {stakeholders} = useFetchStakeholders();
  const [qParams, setQParams] = useState({});

  const pages = useSelector((state) => state.picReducer.pages);
  const pics = useSelector((state) => state.picReducer.pics);
  const picPage = useSelector((state) => state.picReducer.page);
  
  const getCurrentPage = (page=0) => {
    setCurrentPage(page);
    setQParams({...qParams, page});
    dispatch(setPage(page));
  }

  const handleAddPic = (e) => {
    navigate("add");
  }

  const handleDetail = (e, picId) => {
    navigate(`${picId}`);
  }

  const inputSearch = (e) => {
    setSearch(e.target.value);
  }

  const inputSatkerDirjenFilter = (e) => {
    if (e.target.value === "All") {
      setQParams({});
      dispatch(fetchPics({}));
    }
    else {
      const newQParams = {
        ...qParams,
        satker_dirjen: e.target.value
      }
      setQParams(newQParams);
      dispatch(fetchPics(newQParams));
    }
  }

  const handleSearchPress = (e) => {
    if (e.key === "Enter") {
      const newQParams = {
        ...qParams,
        search
      }
      setQParams(newQParams);
      dispatch(fetchPics(newQParams));
    }
  }

  const handleInstitution = (e) => {
    const newQParams = {
      ...qParams,
      sorter: "institution"
    }
    setQParams(newQParams);
    dispatch(fetchPics(newQParams));
  }

  useEffect(() => {
    const newQParams = {...qParams, page: picPage}
    dispatch(fetchPics(newQParams));
  }, [dispatch, qParams, picPage]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <h5>PIC</h5>
            <div className="row mt-3">
              <div className="col d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-warning" onClick={handleAddPic}>
                  <strong>+ Add PIC</strong>
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="input-group mb-3" >
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" onChange={inputSearch} onKeyUp={handleSearchPress} required />
              </div>
            </div>
            <div className="row mt-3">
              <p>Satker/Dirjen</p>
            </div>
            <div className="row" style={{paddingLeft: "0.7rem"}}>
              <select className="form-select" aria-label="Default select example" style={{width: "8rem"}} onChange={inputSatkerDirjenFilter}>
                <option value="All">All</option>
                {
                  stakeholders.map(stakeholder => {
                    return (
                      <option key={stakeholder._id} value={stakeholder.acronym}>{stakeholder.acronym}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className="row mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">E-MAIL</th>
                    <th scope="col" style={{cursor: "pointer"}} onClick={handleInstitution}>INSTITUTION</th>
                    <th scope="col">PHONE</th>
                  </tr>
                </thead>
                <tbody>
                  {pics.map(pic => {
                    return (
                      <tr key={pic._id} {...style(hoverStyle)} onClick={(e) => handleDetail (e, pic._id)}>
                        <td>{pic.full_name}</td>
                        <td>{pic.email}</td>
                        <td>{pic.institution}</td>
                        <td>{pic.phone_number}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination onPaginationClick={getCurrentPage} pages={pages} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Pic;
