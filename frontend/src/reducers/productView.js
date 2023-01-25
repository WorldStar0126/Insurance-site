import {  
    GET_PRODUCTVIEW,
    } from "../actions/types";
    
    const initialState = [];
    
    function productViewReducer(products = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_PRODUCTVIEW:
            return [payload];
        default:
          return products;
      }
    };
    
    export default productViewReducer;