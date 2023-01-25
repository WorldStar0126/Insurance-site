import {  
    GET_CATEGORY,
    ADD_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY
    } from "../actions/types";
    
    const initialState = [];
    
    function categoryReducer(category = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_CATEGORY:
          return [payload];
        case ADD_CATEGORY:
          return [...category, payload];
        case EDIT_CATEGORY:
          return [...category, payload];
        case DELETE_CATEGORY:
          return [...category, payload];
        default:
          return category;
      }
    };
    
    export default categoryReducer;