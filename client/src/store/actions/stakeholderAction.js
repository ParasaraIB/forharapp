import Swal from "sweetalert2";
import axios from "axios";

import {
  API_URL,
  FETCH_STAKEHOLDERS,
  ADD_STAKEHOLDER,
  FETCH_STAKEHOLDER,
  EDIT_STAKEHOLDER,
  REMOVE_STAKEHOLDER
} from "../actionTypes";
import { useNavigate } from "react-router-dom";

export const fetchStakeholders = (page) => {
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: `${API_URL}/stakeholder/stakeholderList?page=${page}`, 
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(({data}) => {
        dispatch({
          type: FETCH_STAKEHOLDERS,
          payload: data
        });
      })
      .catch(err => {
        console.error(err.response, "<<<< fetchStakeholders stakeholderAction");
      });
  }
}

export const addStakeholder = (data, navigate) => {
  return (dispatch, getState) => {
    axios({
      method: "POST",
      url: `${API_URL}/stakeholder/addStakeholder`,
      headers: {
        access_token: localStorage.getItem("access_token")
      },
      data
    })
      .then(({data}) => {
        dispatch({
          type: ADD_STAKEHOLDER,
          payload: data
        });
        navigate("/stakeholder");
      })
      .catch(err => {
        console.error(err.response, "<<<< addStakeholder stakeholderAction");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message
        });
      })
  }
}

export const fetchStakeholder = (id) => {
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: `${API_URL}/stakeholder/stakeholderDetail?id=${id}`,
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(({data}) => {
        dispatch({
          type: FETCH_STAKEHOLDER,
          payload: data
        });
      })
      .catch(err => {
        console.error(err.response, "<<<< fetchStakeholder stakeholderAction");
      })
  } 
}