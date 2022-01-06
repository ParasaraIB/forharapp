import {
  API_URL,
  FETCH_TOPICS,
  ADD_TOPIC,
  FETCH_TOPIC,
  EDIT_TOPIC,
  DELETE_TOPIC
} from "../actionTypes";

export const fetchTopics = (page) => {
  return (dispatch, getState) => {
    fetch(`${API_URL}/topic/topicList?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access_token": localStorage.getItem("access_token")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCH_TOPICS,
          payload: data
        })
      })
      .catch(err => {
        console.error(err, "<<<< fetchTopics");
      })
  }
}