import {  
    CHANGE_CONTACTPAGESTATUS
    } from "../actions/types";
    
    const initialState = 1;
    
    function contactPageReducer(pageStatus = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case CHANGE_CONTACTPAGESTATUS:
          return pageStatus = payload;
        default:
          return pageStatus;
      }
    };
    
    export default contactPageReducer;