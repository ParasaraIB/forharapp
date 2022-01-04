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
  access_token: null
};

const picReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_PIC: 
      return {
        ...state,
        loggedInPic: action.payload.pic,
        access_token: action.payload.access_token
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        access_token: null
      }
    default:
      return state;
  }
}

export default picReducer;