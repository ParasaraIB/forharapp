import {
  API_URL,
  FETCH_STAKEHOLDERS,
  ADD_STAKEHOLDER,
  FETCH_STAKEHOLDER,
  EDIT_STAKEHOLDER,
  DELETE_STAKEHOLDER
} from "../actionTypes";

export const fetchStakeholders = (page) => {
  return (dispatch, getState) => {
    fetch(`${API_URL}/stakeholder/stakeholderList?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access_token": localStorage.getItem("access_token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCH_STAKEHOLDERS,
          payload: data
        })
      })
      .catch(err => {
        console.error(err, "<<<< fetchStakeholders");
      })
  }
}