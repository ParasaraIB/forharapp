import {
  LOGIN_PIC,
  FETCH_PICS,
  ADD_PIC,
  FETCH_PIC,
  EDIT_PIC,
  REMOVE_PIC,
  CLEAR_TOKEN,
  SET_PAGE
} from "../actionTypes";

const initialState = {
  pics: [],
  pic: null,
  loggedInPic: null,
  access_token: null,
  pages: 0,
  page: 0
};

const picReducer = (state=initialState, action) => {
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
      };
    case FETCH_PICS:
      return {
        ...state,
        pics: action.payload.pics,
        pages: action.payload.pages
      };
    case ADD_PIC:
      return {
        ...state,
        pics: state.pics.concat(action.payload.newPic)
      };
    case FETCH_PIC:
      return {
        ...state,
        pic: action.payload.pic
      }
    case EDIT_PIC:
      const filteredPic = state.pics.filter(pic => pic._id !== action.payload.pic._id);
      return {
        ...state,
        pics: filteredPic.concat(action.payload.pic)
      };
    case REMOVE_PIC:
      const notRemoved = state.pics.filter(pic => pic._id !== action.payload.pic._id);
      return {
        ...state,
        pics: notRemoved
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
}

export default picReducer;