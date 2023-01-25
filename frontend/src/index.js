import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import store from "./store";
// import configureStore  from './configureStore';
import { Provider } from 'react-redux';
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apolloClient";
import * as serviceWorker from "./serviceWorker";
import {
  getCompany,
  getCategory,
  getSubCategory,
  getProduct,
  getProductView,
  getPolicyView,
  getidType,
  getpaySchdeule,
  getcoverAmount,
  getcoverType,
  getmemberType,
  getrelationshiplist
} from "./actions/tutorials";

const Error404Modern = lazy(() => import("./pages/error/404-modern"));

// const store = configureStore();
store.dispatch(getCompany());
store.dispatch(getCategory());
store.dispatch(getSubCategory());
store.dispatch(getProduct());
store.dispatch(getProductView());
store.dispatch(getPolicyView());
store.dispatch(getidType());
store.dispatch(getpaySchdeule());
store.dispatch(getcoverAmount());
store.dispatch(getcoverType());
store.dispatch(getmemberType());
store.dispatch(getrelationshiplist());

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<div />}>
      <Router basename={`/`}>
        <ApolloProvider client={client}>    
          <Provider  store={store}>
              <Route render={
                ({ location }) => (location.state && location.state.is404 ? <Error404Modern /> : <App />)
              } />  
          </Provider>
          
        </ApolloProvider>
      </Router>
    </Suspense>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();