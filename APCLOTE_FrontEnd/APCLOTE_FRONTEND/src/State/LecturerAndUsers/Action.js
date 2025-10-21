import axios from "axios"
import { GETALL_LEECTURERS_FAILURE, GETALL_LEECTURERS_REQUEST, GETALL_LEECTURERS_SUCCESS, GETALL_STUDENTS_FAILURE, GETALL_STUDENTS_REQUEST, GETALL_STUDENTS_SUCCESS, GETALL_USER_TESTANS_FAILURE, GETALL_USER_TESTANS_REQUEST, GETALL_USER_TESTANS_SUCCESS, GETALL_USERS_FAILURE, GETALL_USERS_REQUEST, GETALL_USERS_SUCCESS } from "./ActionType"

export const getLecturers=(pageNumber)=>async (dispatch)=>{
    dispatch({type:GETALL_LEECTURERS_REQUEST})
    try{
   const response= await axios.get(`http://localhost:9898/admin/getAllLecturers?pageNumber=${pageNumber}&pageSize=20`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:GETALL_LEECTURERS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:GETALL_LEECTURERS_FAILURE,payload:error.response.data.message})
    }
}

export const getSearchedLecturers = (key, pageNumber = 1) => async (dispatch) => {
  dispatch({ type: GETALL_LEECTURERS_REQUEST });
  try {
    const response = await axios.get(
      `http://localhost:9898/admin/getSearchLecturers?pageNumber=${pageNumber}&pageSize=20&key=${key}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`,
        },
      }
    );
    dispatch({ type: GETALL_LEECTURERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GETALL_LEECTURERS_FAILURE,
      payload: error.response?.data?.message || "Search failed",
    });
  }
};

export const getUsers=()=>async (dispatch)=>{
    dispatch({type:GETALL_USERS_REQUEST})
    try{
   const response= await axios.get(`http://localhost:9898/admin/getAllUserspageNumber=${pageNumber}pageSize=20`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:GETALL_USERS_SUCCESS,payload:response.data})
   
    }
    catch(error){
        dispatch({type:GETALL_USERS_FAILURE,payload:error.response.data.message})
    }
}

export const getAllUserTestAns=()=>async (dispatch)=>{
    dispatch({type:GETALL_USER_TESTANS_REQUEST})
    try{
   const response= await axios.get("http://localhost:9898/api/getUserTestAns",{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:GETALL_USER_TESTANS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:GETALL_USER_TESTANS_FAILURE,payload:error.response.data.message})
    }
}


export const getAllStudents=(pageNumber)=>async (dispatch)=>{
    dispatch({type:GETALL_STUDENTS_REQUEST})
    try{
   const response= await axios.get(`http://localhost:9898/admin/getStudents?pageNumber=${pageNumber}&pageSize=20`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:GETALL_STUDENTS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:GETALL_STUDENTS_FAILURE,payload:error.response.data.message})
    }
}

export const getSearchedStudents=(key,pageNumber)=>async (dispatch)=>{
    dispatch({type:GETALL_STUDENTS_REQUEST})
    try{
   const response= await axios.get(`http://localhost:9898/admin/getSearchedStudents?pageNumber=${pageNumber}&pageSize=20&key=${key}`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    console.log("stttuuudddeeenttt")
    dispatch({type:GETALL_STUDENTS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:GETALL_STUDENTS_FAILURE,payload:error.response.data.message})
    }
}