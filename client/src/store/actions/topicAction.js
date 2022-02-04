import axios from "axios";

import {
  API_URL,
  FETCH_TOPICS,
  ADD_TOPIC,
  FETCH_TOPIC,
  EDIT_TOPIC,
  REMOVE_TOPIC
} from "../actionTypes";

export const fetchTopics = (page) => {
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: `${API_URL}/topic/topicList?page=${page}`,
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(({data}) => {
        dispatch({
          type: FETCH_TOPICS,
          payload: data
        })
      })
      .catch(err => {
        console.error(err.response, "<<<< fetchTopics topicAction");
      });
  }
}

export const fetchTopic = (id) => {
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
          type: FETCH_TOPIC,
          payload: data
        });
      })
      .catch(err => {
        console.error(err.response, "<<<< fetchTopic picAction");
      })
  }
}