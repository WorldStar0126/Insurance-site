import {  
    SORT_DATA
    } from "../actions/types";
    
    const initialState = [];
    
    function visibleReducer(visibledata = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case SORT_DATA:
          return [
                    payload[0].sort(function(a,b) {
                      return (a.c_productname < b.c_productname) ? -1 : (a.c_productname > b.c_productname) ? 1 : 0;
                    })
                  ];
        default:
          return visibledata;
      }
    };
    
    export default visibleReducer;