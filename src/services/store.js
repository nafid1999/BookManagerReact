import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RouteReducer from "./RouteReducer";

export const store=createStore(RouteReducer,applyMiddleware(thunk))