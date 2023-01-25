import {  
    GET_PRODUCT,
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT
    } from "../actions/types";
    
    const initialState = [];
    
    function productReducer(products = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_PRODUCT:
          return [payload];
        case ADD_PRODUCT:
          return [...products, payload];
        case EDIT_PRODUCT:
          return [...products, payload];
        case DELETE_PRODUCT:
          return [...products, payload];
        default:
          return products;
      }
    };
    
    export default productReducer;