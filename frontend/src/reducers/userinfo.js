import {  
    GET_USERBYID
    } from "../actions/types";
    
    const initialState = [];
    
    function userinfoReducer(infos = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        case GET_USERBYID:
          return [payload];
        default:
          return infos;
      }
    };
    
    export default userinfoReducer;