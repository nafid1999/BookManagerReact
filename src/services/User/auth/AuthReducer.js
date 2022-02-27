import {LOGIN_REQUEST,REQUEST_FAILURE,REQUEST_SUCCESS} from "./types"


const myinitialState = {
 isLoggedin:false
}

export const authReducer = (state = myinitialState, action) => {

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state
      }
    
    case REQUEST_SUCCESS:
      return {
        ...state,
        isLoggedin: action.payload
      }
    case REQUEST_FAILURE:
      return {
        ...state,
        isLoggedin: action.payload
      }
    default:
      return state
  }
}
