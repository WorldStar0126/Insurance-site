import {  
    SET_PREMIUMCNT,
    SET_PLANCNT,
    DELETE_PLANCNT,
    SET_AMOUNTCNT,
    DELETE_AMOUNTCNT
    } from "../actions/types";
    
    const initialState = {
        premiumCnt: 0,
        planCnt: 1,
        amountCnt: 1,
    };
    
    function premiumReducer(state = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case SET_PREMIUMCNT:
          return {...state, premiumCnt : payload}
        case SET_PLANCNT:
          return {...state, planCnt : state.planCnt + 1}
        case DELETE_PLANCNT:
            return {...state, planCnt : state.planCnt - 1}
        case SET_AMOUNTCNT:
          return {...state, amountCnt : state.amountCnt + 1}
        case DELETE_AMOUNTCNT:
            return {...state, amountCnt : state.amountCnt - 1}
          return state;
        default:
          return state;
      }
    };
    
    export default premiumReducer;