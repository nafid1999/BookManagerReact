
import { combineReducers } from "redux";
import  {bookReducer}  from "./Book/BookReducer";

export default combineReducers({
    savedBook:bookReducer   
})