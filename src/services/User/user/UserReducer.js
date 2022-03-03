// import {ADD_USER_REQUEST,REQUEST_FAILURE,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,FETCH_REQUEST_SUCCESS,FETCH_REQUEST,REQUEST_SUCCESS} from "./types"


// const initialState = {
//   listUsers:[],
//   error: false,
//   success:false
// }

// export const userReducer = (state = initialState, action) => {

//   switch (action.type) {
//     case ADD_USER_REQUEST:
//     case FETCH_REQUEST:
//     case DELETE_USER_REQUEST:
//       return {
//         ...state
//       }
    
//     case FETCH_REQUEST_SUCCESS:
//       return {
//         ...state,
//         listUsers:[...action.payload]
//       }

//     case DELETE_USER_SUCCESS:
//       return {
//         ...state,
//         listUsers:[...action.payload]
//       }
//     case REQUEST_SUCCESS:
//       return {
//         ...state,
//         success:action.payload
//       }
//     case REQUEST_FAILURE:
//       return {
//         ...state,
//         error: action.payload
//       }
//     default:
//       return state
//   }
// }
