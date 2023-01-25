import {  
    GET_SUBCATEGORY,
    ADD_SUBCATEGORY,
    EDIT_SUBCATEGORY,
    DELETE_SUBCATEGORY
    } from "../actions/types";
    
    const initialState = [];
    
    function subcategoryReducer(subcategory = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_SUBCATEGORY:
          return [payload];
        case ADD_SUBCATEGORY:
          return [...subcategory, payload];
        case EDIT_SUBCATEGORY:
          return [...subcategory, payload];
        case DELETE_SUBCATEGORY:
          return [...subcategory, payload];
        default:
          return subcategory;
      }
    };
    
    export default subcategoryReducer;