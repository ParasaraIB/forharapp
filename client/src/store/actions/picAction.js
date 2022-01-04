import {
  LOGIN_PIC,
  FETCH_PICS,
  ADD_PIC,
  FETCH_PIC,
  EDIT_PIC,
  DELETE_PIC,
  CLEAR_TOKEN
} from "../actionTypes";

const apiUrl = "http://localhost:3000"; 

export const loginPic = (data) => {
  return (dispatch, getState) => {
    fetch(`${apiUrl}/pic/picLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: LOGIN_PIC,
          payload: data
        });
      })
      .catch((err) => {
        console.error(err, "<<<< loginPic");
      });
  }
}

export const clearToken = () => {
  return {
    type: CLEAR_TOKEN
  }
}