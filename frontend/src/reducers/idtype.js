import {  
    GET_IDTYPE,
    } from "../actions/types";
    
    const initialState = [];
    
    function idtypeReducer(types = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_IDTYPE:
          return payload;
        default:
          return types;
      }
    };
    
    export default idtypeReducer;