import {ADD_USER_REQUEST,UPDATE_USER_REQUEST,FETCH_REQUEST_SUCCESS,FETCH_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_REQUEST,REQUEST_FAILURE,REQUEST_SUCCESS} from "./types"
import axios from "axios";

export const createUser=(user)=>dispatch=>{
    dispatch(createRequest());
    axios.post("/person/", user)
         .then((res) => {
            if (res.status === 201) {
                dispatch(success(true))
                setTimeout(()=>dispatch(success(false)),3000)
            }
        }).catch((err) =>{
            if(err.response.status===400){
                dispatch(failure(true))
            }
        })
}
export const deleteUser=(idUser,updatedlistUsers)=>dispatch=>{
    dispatch(deleteRequest());
    axios.delete("/person/"+idUser)
         .then((res) => {
            if (res.status === 200) {
                dispatch(deleteSuccess(updatedlistUsers))
                dispatch(success(true))
                setTimeout(()=>dispatch(success(false)),3000)
            }
        }).catch((err) =>{
            if(err.response.status===400){
                dispatch(failure(true))
            }
        })
}
export const fetchUsers=()=>dispatch=>{
    dispatch(fetchRequest());
     axios.get("/person/")
            .then((res) =>dispatch(fetchSuccess([...res.data.personList])) )
            .catch((err) => console.log(err))
}

export const updateUser=(user,id)=>dispatch=>{
    dispatch(updateRequest());
    axios.put("/person/"+id, user)
         .then((res) => {
            if (res.status === 200) {
                dispatch(success(true))
                setTimeout(()=>dispatch(success(false)),3000)
            }
        }).catch((err) =>{
            if(err.response.status===400){
                dispatch(failure(true))
            }
        })
}

/**
 *  actions
 */
const fetchRequest=(user)=>{
    return {
           type:FETCH_REQUEST
    }
}
const createRequest=()=>{
    return {
           type:ADD_USER_REQUEST
    }
}
const updateRequest=()=>{
    return {
           type:UPDATE_USER_REQUEST
    }
}
const deleteRequest=()=>{
    return {
           type:DELETE_USER_REQUEST
    }
}
const fetchSuccess=(userList)=>{
    return {
           type:FETCH_REQUEST_SUCCESS,
           payload:userList
    }
}
const deleteSuccess=(user)=>{
    return {
           type:DELETE_USER_SUCCESS,
           payload:user
    }
}
const success=(success)=>{
    return {
           type:REQUEST_SUCCESS,
           payload:success
    }
}
const failure=(error)=>{
    return {
           type:REQUEST_FAILURE,
           payload:error
    }
}

