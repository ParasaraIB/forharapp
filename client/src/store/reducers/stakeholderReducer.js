import {
  FETCH_STAKEHOLDERS,
  ADD_STAKEHOLDER,
  FETCH_STAKEHOLDER,
  EDIT_STAKEHOLDER,
  DELETE_STAKEHOLDER
} from "../actionTypes";

const initialState = {
  stakeholders: [],
  stakeholder: null,
  pages: 0
};

const stakeholderReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_STAKEHOLDERS:
      return {
        ...state,
        stakeholders: action.payload.stakeholders,
        pages: action.payload.pages
      }
    default:
      return state;
  }
}

export default stakeholderReducer;