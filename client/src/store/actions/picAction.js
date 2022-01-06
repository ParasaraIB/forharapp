import Swal from "sweetalert2";

import {
  API_URL,
  LOGIN_PIC,
  FETCH_PICS,
  ADD_PIC,
  FETCH_PIC,
  EDIT_PIC,
  DELETE_PIC,
  CLEAR_TOKEN
} from "../actionTypes";

export const loginPic = (data) => {
  return (dispatch, getState) => {
    fetch(`${API_URL}/pic/picLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 400) {
          Swal.fire({
            icon: "warning",
            title: "Authentication failed",
            text: "Invalid email or password",
          });
        }
        return res.json()
      })
      .then(data => {
        dispatch({
          type: LOGIN_PIC,
          payload: data.access_token
        });
      })
      .catch(err => {
        console.error(err, "<<<< loginPic");
      });
  }
}

export const clearToken = () => {
  return {
    type: CLEAR_TOKEN
  }
}

export const fetchPics = (page) => {
  return (dispatch, getState) => {
    fetch(`${API_URL}/pic/picList?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access_token": localStorage.getItem("access_token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCH_PICS,
          payload: data
        });
      })
      .catch(err => {
        console.error(err, "<<<< fetchPics");
      })
  }
}