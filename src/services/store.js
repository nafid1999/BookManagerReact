import { createStore } from "redux";
import { applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import RouteReducer from "./RouteReducer";

export  const store=createStore(RouteReducer,compose(applyMiddleware(thunk),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));