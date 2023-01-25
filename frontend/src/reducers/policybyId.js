import {
  GET_POLICYBYID,
  } from "../actions/types";
  
  const initialState = [];
  
  function policybyIdReducer(policybyid = initialState, action) {
    const { type, payload } = action;
    
      switch (type) {
        case GET_POLICYBYID:
          return payload
        default:
          return policybyid;
      }
  };
  
  export default policybyIdReducer;