import {
  FETCH_TOPICS,
  ADD_TOPIC,
  FETCH_TOPIC,
  EDIT_TOPIC,
  DELETE_TOPIC
} from "../actionTypes";

const initialState = {
  topics: [],
  topic: null,
  pages: 0
};

const topicReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_TOPICS:
      return {
        ...state,
        topics: action.payload.topics,
        pages: action.payload.pages
      }
    default:
      return state;
  }
}

export default topicReducer;