import axios from "axios";
import {CREATE_BOOK_REQUEST,UPDATE_BOOK_REQUEST,REQUEST_SUCCESS,REQUEST_FAILURE,FETCH_BOOK_REQUEST } from "./types";

export  const createBook=(book)=>dispatch=>{
    dispatch(createBookRequest())
    axios.post("/books/create",book)
         .then(res=>dispatch(requestSuccess(res.data)))
         .catch(err=>dispatch(requestFailure(err)))
}  

export  const fetchBook=(bookId)=>dispatch=>{
    dispatch(fetchBookRequest())
    axios.get("/books/edit/"+bookId)
    .then(res=>{
        if(res.data!=null && res.status===200){
            dispatch(requestSuccess(res.data))
        }
    }).catch((err)=>dispatch(requestFailure(err)))
}   

export const updateBook=(bookId,book)=>dispatch=>{
        dispatch(updateBookRequest())
        axios.put("/books/update/"+bookId,book)
             .then(res=>dispatch(requestSuccess(res.data)))
             .catch(err=>dispatch(requestFailure(err)))
}   

const createBookRequest=()=>{
    return {
           type:CREATE_BOOK_REQUEST
    }
}

const updateBookRequest=()=>{
    return {
           type:UPDATE_BOOK_REQUEST
    }
}
const fetchBookRequest=()=>{
    return {
           type:FETCH_BOOK_REQUEST
    }
}
const requestSuccess=(book)=>{
    return {
           type:REQUEST_SUCCESS,
           payload:book
    }
}
const requestFailure=(error)=>{
    return {
           type:REQUEST_FAILURE,
           payload:error
    }
}


