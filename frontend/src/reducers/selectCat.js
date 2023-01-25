import {  
    SELECT_CAT
    } from "../actions/types";
    
    const initialState = 1;
    
    function selectcatReducer(selectcat = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case SELECT_CAT:
          return selectcat = payload;
        default:
          return selectcat;
      }
    };
    
    export default selectcatReducer;