import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { fetchPics } from "../store/actions/picAction";

const Pic = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);

  const pages = useSelector((state) => state.picReducer.pages);
  const pics = useSelector((state) => state.picReducer.pics);

  const getCurrentPage = (page = 0) => {
    setCurrentPage(page);
  }

  const handleAddPic = (e) => {
    navigation("add");
  }

  useEffect(() => {
    dispatch(fetchPics(currentPage));
  }, [dispatch, currentPage]);

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
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">E-MAIL</th>
                    <th scope="col">INSTITUTION</th>
                    <th scope="col">PHONE</th>
                  </tr>
                </thead>
                <tbody>
                  {pics.map(pic => {
                    return (
                      <tr key={pic._id}>
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
