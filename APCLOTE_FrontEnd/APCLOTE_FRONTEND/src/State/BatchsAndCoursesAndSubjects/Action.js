import axios from "axios"
import { GET_COURSES_FAILURE, GET_COURSES_REQUEST, GET_COURSES_SUCCESS, GETALL_BATCHS_FAILURE, GETALL_BATCHS_REQUEST, GETALL_BATCHS_SUCCESS, GETMY_BATCHS_FAILURE, GETMY_BATCHS_REQUEST, GETMY_BATCHS_SUCCESS, LECTURER_GETMY_BATCHS_FAILURE, LECTURER_GETMY_BATCHS_REQUEST, LECTURER_GETMY_BATCHS_SUCCESS, SEARCH_BATCHS_FAILURE, SEARCH_BATCHS_REQUEST, SEARCH_BATCHS_SUCCESS, SUBJECTS_FAILURE, SUBJECTS_REQUEST, SUBJECTS_SUCCESS } from "./ActionType"
import { toast } from "react-toastify"
import { buildApiUrl, buildUrl } from "../../config/api"


export const getAllBatchs=(pageNumber)=>async (dispatch)=>{
    dispatch({type:GETALL_BATCHS_REQUEST})
    try{
   const response= await axios.get(buildApiUrl(`/getAllBatchs?pageNumber=${pageNumber}&pageSize=20`))
    console.log(response.data)
    console.log("Batchss222")
    
    dispatch({type:GETALL_BATCHS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:GETALL_BATCHS_FAILURE,payload:error.response.data.message})
    }
}

export const getMyBatchs=()=>async (dispatch)=>{
    dispatch({type:GETMY_BATCHS_REQUEST})
    try{
   const response= await axios.get(buildApiUrl("/getMyBatchs"),{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    console.log("mybatchs")
    dispatch({type:GETMY_BATCHS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:GETMY_BATCHS_FAILURE,payload:error.response.data.message})
    }
}

export const getLecturerBatchs=()=>async (dispatch)=>{
    dispatch({type:LECTURER_GETMY_BATCHS_REQUEST})
    try{
   const response= await axios.get(buildUrl("/lecturer/getMyBatchs"),{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    
    dispatch({type:LECTURER_GETMY_BATCHS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:LECTURER_GETMY_BATCHS_FAILURE,payload:error.response.data.message})
    }
}

export const getSearchedBatchs=(key)=>async (dispatch)=>{
    dispatch({type:SEARCH_BATCHS_REQUEST})
    try{
   const response= await axios.get(buildApiUrl(`/search?key=${key}`))
    console.log(response.data)
    console.log("SSSEERCHHH")
    dispatch({type:SEARCH_BATCHS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:SEARCH_BATCHS_FAILURE,payload:error.response.data.message})
    }
}

export const getSubjects=()=>async (dispatch)=>{
    
    dispatch({type:SUBJECTS_REQUEST})
    try{
   const response= await axios.get(buildUrl("/admin/getAllSubjects"),{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:SUBJECTS_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:SUBJECTS_FAILURE,payload:error.response.data.message})
    }
}

export const getCourses=()=>async (dispatch)=>{
    dispatch({type:GET_COURSES_REQUEST})
    try{
   const response= await axios.get(buildUrl("/admin/getAllCourses"),{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:GET_COURSES_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:GET_COURSES_FAILURE,payload:error.response.data.message})
    }
}
