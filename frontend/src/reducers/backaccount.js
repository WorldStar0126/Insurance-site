import {  
    GET_BANKACCOUNT,
    ADD_BANKACCOUNT,
    EDIT_BANKACCOUNT,
    DELETE_BANKACCOUNT
    } from "../actions/types";
    
    const initialState = [];
    
    function bankaccountReducer(bankaccounts = initialState, action) {
      const { type, payload } = action;
    
      switch (type) {
        case GET_BANKACCOUNT:
          return [payload];
        case ADD_BANKACCOUNT:
          return [...bankaccounts, payload];
        case EDIT_BANKACCOUNT:
          return [...bankaccounts, payload];
        case DELETE_BANKACCOUNT:
          return [...bankaccounts, payload];
        default:
          return bankaccounts;
      }
    };
    
    export default bankaccountReducer;