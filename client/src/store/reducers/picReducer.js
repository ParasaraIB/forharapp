import {
  LOGIN_PIC,
  FETCH_PICS,
  ADD_PIC,
  FETCH_PIC,
  EDIT_PIC,
  DELETE_PIC,
  CLEAR_TOKEN
} from "../actionTypes";

const initialState = {
  pics: [],
  pic: null,
  loggedInPic: null,
  access_token: null,
  pages: null
};

const picReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_PIC: 
      return {
        ...state,
        access_token: action.payload
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        access_token: null
      }
    case FETCH_PICS:
      return {
        ...state,
        pics: action.payload.pics,
        pages: action.payload.pages
      }
    default:
      return state;
  }
}

export default picReducer;