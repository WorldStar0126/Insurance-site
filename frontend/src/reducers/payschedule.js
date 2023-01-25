import {  
    GET_PAYSCHEDULE
    } from "../actions/types";
    
    const initialState = [];
    
    function payscheduleReducer(payschedule = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_PAYSCHEDULE:
          return payload;
        default:
          return payschedule;
      }
    };
    
    export default payscheduleReducer;