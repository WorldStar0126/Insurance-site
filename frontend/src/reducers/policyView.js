import {  
    GET_POLICYVIEW,
    } from "../actions/types";
    
    const initialState = [];
    
    function policyViewReducer(policies = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_POLICYVIEW:
            return [payload];
        default:
          return policies;
      }
    };
    
    export default policyViewReducer;