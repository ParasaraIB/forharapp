import axios from "axios";
import Swal from "sweetalert2";

import {
  API_URL,
  LOGIN_PIC,
  FETCH_PICS,
  ADD_PIC,
  FETCH_PIC,
  EDIT_PIC,
  REMOVE_PIC,
  CLEAR_TOKEN,
  SET_PAGE
} from "../actionTypes";

export const loginPic = (data) => {
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: `${API_URL}/pic/picLogin`,
      data
    })
      .then(({data}) => {
        dispatch({
          type: LOGIN_PIC,
          payload: data.access_token
        });
      })
      .catch(err => {
        console.error(err.response, "<<<< loginPic picAction");
      });
  }
}

export const clearToken = () => {
  return {
    type: CLEAR_TOKEN
  }
}

export const fetchPics = (qParams) => {
  return (dispatch, getState) => {
    const {
      page=0, 
      search="", 
      satker_dirjen="", 
      sorter=""
    } = qParams;
    axios({
      method: "GET",
      url: `${API_URL}/pic/picList?page=${page}&search=${search}&satker_dirjen=${satker_dirjen}&sorter=${sorter}`,
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(({data}) => {
        dispatch({
          type: FETCH_PICS,
          payload: data
        });
      })
      .catch(err => {
        console.error(err.response, "<<<< fetchPics picAction");
      });
  }
}

export const addPic = (data, navigate) => {
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: `${API_URL}/pic/addPic`,
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      data
    })
      .then(({data}) => {
        dispatch({
          type: ADD_PIC,
          payload: data
        });
        navigate("/pic");
      })
      .catch(err => {
        console.error(err.response, "<<<< addPic picAction");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message
        });
      })
  }
}

export const fetchPic = (id) => {
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: `${API_URL}/pic/picDetail?id=${id}`,
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(({data}) => {
        dispatch({
          type: FETCH_PIC,
          payload: data
        });
      })
      .catch(err => {
        console.error(err.response, "<<<< fetchPic picAction");
      })
  }
}

export const editPic = (data, navigate) => {
  return (dispatch, getState) => {
    axios({
      method: "PUT",
      url: `${API_URL}/pic/editPic`,
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      data
    })
      .then(({data}) => {
        dispatch({
          type: EDIT_PIC,
          payload: data
        });
        navigate("/pic");
      })
      .catch(err => {
        console.error(err.response, "<<<< editPic picAction");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message
        });
      })
  }
}

export const removePic = (_id, navigate) => {
  return (dispatch, getState) => {
    axios({
      method: "DELETE",
      url: `${API_URL}/pic/removePic`,
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      data: {
        _id
      }
    })
      .then(({data}) => {
        dispatch({
          type: REMOVE_PIC,
          payload: data
        });
        navigate("/pic");
      })
      .catch(err => {
        console.error(err.response, "<<<< removePic picAction");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message
        });
      })
  }
}

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page
  }
}