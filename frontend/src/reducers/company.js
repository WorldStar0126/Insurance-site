import {  
    GET_COMPANY,
    ADD_COMPANY,
    EDIT_COMPANY,
    DELETE_COMPANY
    } from "../actions/types";
    
    const initialState = [];
    
    function companyReducer(companies = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        case GET_COMPANY:
          return [payload];
        case ADD_COMPANY:
          return [...companies, payload];
        case EDIT_COMPANY:
          return [...companies, payload];
        case DELETE_COMPANY:
          return [...companies, payload];
        default:
          return companies;
      }
    };
    
    export default companyReducer;