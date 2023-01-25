import {  
    GET_OPTIONTYPE,
    ADD_OPTIONTYPE,
    EDIT_OPTIONTYPE,
    DELETE_OPTIONTYPE
    } from "../actions/types";
    
    const initialState = [];
    
    function covertypeReducer(covertypes = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        case GET_OPTIONTYPE:
          return [payload];
        case ADD_OPTIONTYPE:
          return [...covertypes, payload];
        case EDIT_OPTIONTYPE:
          return [...covertypes, payload];
        case DELETE_OPTIONTYPE:
          return [...covertypes, payload];
        default:
          return covertypes;
      }
    };
    
    export default covertypeReducer;