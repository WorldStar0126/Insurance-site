import { combineReducers } from "redux";
import tutorials from "./tutorials";
import userinfoReducer from "./userinfo";
import companyReducer from "./company";
import categoryReducer from "./category";
import subcategoryReducer from "./subcategory";
import selectcatReducer from "./selectCat";
import productReducer from "./product";
import productViewReducer from "./productView";
import policyReducer from "./policy";
import policyViewReducer from "./policyView";
import contactPageReducer from "./contactpage";
import visibleReducer from "./visibledata";
import premiumReducer from "./premium";
import idtypeReducer from "./idtype";
import payscheduleReducer from "./payschedule";
import coveramountReducer from "./coveramount";
import covertypeReducer from "./covertype";
import policybyIdReducer from "./policybyId";
import getsubdataReducer from "./getsubdata";
import bankaccountReducer from "./backaccount";
import contactReducer from "./contact";

export default combineReducers({
  tutorials,
  userinfoReducer,
  companyReducer,
  categoryReducer,
  subcategoryReducer,
  productReducer,
  productViewReducer,
  policyReducer,
  policybyIdReducer,
  policyViewReducer,
  contactPageReducer,
  visibleReducer,
  selectcatReducer,
  premiumReducer,
  idtypeReducer,
  payscheduleReducer,
  coveramountReducer,
  covertypeReducer,
  getsubdataReducer,
  bankaccountReducer,
  contactReducer
});
