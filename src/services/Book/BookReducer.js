import { CREATE_BOOK_REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE, FETCH_BOOK_REQUEST, UPDATE_BOOK_REQUEST } from "./types"
const initialInputs = { id:"",title: "", author: "", price: "", coverPhotoURL: "", language: "", isbnNumber: "",genre:"" }

const initialState = {
  book: initialInputs,
  error: ""
}

export const bookReducer = (state = initialState, action) => {

  switch (action.type) {
    case CREATE_BOOK_REQUEST:
      return {
        ...state
      }
    case UPDATE_BOOK_REQUEST:
      return {
        ...state,
      }
    case FETCH_BOOK_REQUEST:
      return {
        ...state,
      }
    case REQUEST_SUCCESS:
      return {
        ...state,
        book: action.payload
      }
    case REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
