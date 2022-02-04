import {
  FETCH_STAKEHOLDERS,
  ADD_STAKEHOLDER,
  FETCH_STAKEHOLDER,
  EDIT_STAKEHOLDER,
  REMOVE_PIC
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
      };
    case ADD_STAKEHOLDER:
      return {
        ...state,
        stakeholders: state.stakeholders.concat(action.payload.newStakeholder)
      };
    case FETCH_STAKEHOLDER:
      return {
        ...state,
        stakeholder: action.payload.stakeholder
      }
    default:
      return state;
  }
}

export default stakeholderReducer;