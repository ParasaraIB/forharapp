import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { fetchTopics } from "../store/actions/topicAction";

const Topic = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);

  const pages = useSelector((state) => state.topicReducer.pages);
  const topics = useSelector((state) => state.topicReducer.topics);

  const getCurrentPage = (page = 0) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchTopics(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Navbar />
        <div className="col py-3">
          <div className="container">
            <h5>TOPIC</h5>
            <div className="row mt-3">
              <div className="col d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-warning">
                  <strong>+ Add Topic</strong>
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">TITLE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">IMPORTANCE</th>
                    <th scope="col">PIC</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map((topic) => {
                    return (
                      <tr key={topic._id}>
                        <td>{topic.title}</td>
                        <td>{topic.status}</td>
                        <td>{topic.category}</td>
                        <td>{topic.importance}</td>
                        <td>
                          <div className="container" style={{padding: "0 0 0 12px"}}>
                            <div className="row">
                              {topic.pic_bi[0].full_name}
                            </div>
                            <div className="row">
                              {topic.pic_kemenkeu[0].full_name}
                            </div>
                          </div>
                        </td>
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

export default Topic;
