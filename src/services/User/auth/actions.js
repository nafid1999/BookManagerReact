import {LOGIN_REQUEST,REQUEST_FAILURE,REQUEST_SUCCESS} from "./types"


export const authenticateUser=(email,password)=>dispatch=>{
    console.log("gooooooooooood")
    dispatch(loginRequest());
    if(email==="test" && password==="test"){
        dispatch(success(true))
    }else
    dispatch(failure(false))

}

const loginRequest=()=>{
    return {
           type:LOGIN_REQUEST
    }
}
const success=(isLoggedin)=>{
    return {
           type:REQUEST_SUCCESS,
           payload:isLoggedin
    }
}
const failure=(isLoggedin)=>{
    return {
           type:REQUEST_FAILURE,
           payload:isLoggedin
    }
}

