import { actionTypes } from "redux-firestore";

const initialState = {
  projects: [ ],
  isLoading: false,
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CREATE_PROJECT_LOAD":
      return {
        ...state,
        isLoading:true
      }
    case "CREATE_PROJECT_SUCCESS":
      return {
        ...state,
        projects: [...state.projects, payload],
        isLoading: false
      };
    case "CREATE_PROJECT_ERROR":
      console.log("Create project error", payload);
      return {
        ...state,
        isLoading: false
      }
    case "GET_CONSENTS": 
      return {
        ...state,
        projects: payload 
      }      
    default:
      return state;
  }
};

export default projectReducer;
