import { combineReducers } from "redux";
import  {authReducer}  from "./User/auth/AuthReducer";
import  {userReducer}  from "./User/user/UserReducer";


export default combineReducers({
    auth:authReducer,
    user:userReducer
})