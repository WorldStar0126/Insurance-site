import {  
    GET_COVERAMOUNT,
    ADD_COVERAMOUNT,
    EDIT_COVERAMOUNT,
    DELETE_COVERAMOUNT
    } from "../actions/types";
    
    const initialState = [];
    
    function coveramountReducer(coveramounts = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        case GET_COVERAMOUNT:
          return [payload];
        case ADD_COVERAMOUNT:
          return [...coveramounts, payload];
        case EDIT_COVERAMOUNT:
          return [...coveramounts, payload];
        case DELETE_COVERAMOUNT:
          return [...coveramounts, payload];
        default:
          return coveramounts;
      }
    };
    
    export default coveramountReducer;