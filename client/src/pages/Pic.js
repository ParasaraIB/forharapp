import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import { fetchPics } from "../store/actions/picAction";

const Pic = () => {
  const dispatch = useDispatch();

  const pics = useSelector((state) => state.picReducer.pics);
  useEffect(() => {
    dispatch(fetchPics())
  }, [dispatch])
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <h3>PIC</h3>
            <div className="row mt-5">
              <div className="col d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-warning"><strong>+ Add PIC</strong></button>
              </div>
            </div>
            <div className="row mt-5">
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
                  {pics.map((pic) => {
                    return (
                    <tr key={pic._id}>
                      <td>{pic.full_name}</td>
                      <td>{pic.email}</td>
                      <td>{pic.institution}</td>
                      <td>{pic.phone_number}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pic;
