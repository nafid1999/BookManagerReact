import { createStore } from "redux";
import { applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import RouteReducer from "./RouteReducer";
import axios from 'axios';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import { combineReducers } from "redux";

// export  const store=createStore(RouteReducer,compose(applyMiddleware(thunk),
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


    const { requestsReducer, requestsMiddleware } = handleRequests({
      driver: createDriver(axios.create({
        baseURL: 'http://localhost:8081/',
      })),

      
    });
  
    const reducers = combineReducers({
      requests: requestsReducer,
    });
  
    export const store = createStore(reducers,compose(applyMiddleware(...requestsMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
  
 
