import axios from "axios"
import { ASSIGN_FAILURE, ASSIGN_REQUEST, ASSIGN_SUCCESS, CREATE_BATCH_FAILURE, CREATE_BATCH_REQUEST, CREATE_BATCH_SUCCESS, CREATE_COURSE_FAILURE, CREATE_COURSE_REQUEST, CREATE_COURSE_SUCCESS, CREATE_LECTURER_FAILURE, CREATE_LECTURER_SUCCESS, CREATE_SUBJECT_FAILURE, CREATE_SUBJECT_REQUEST, CREATE_SUBJECT_SUCCESS } from "./ActionType"
import { useSelector } from "react-redux"
import store from "../../Store/store"
import { toast } from "react-toastify"
import { buildUrl } from "../../config/api"



export const addSubject=(subject)=>async (dispatch)=>{
     
   dispatch({type:CREATE_SUBJECT_REQUEST})
   try{
     const response=await axios.post(buildUrl("/admin/addSubjectToList"),subject,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
     console.log(response.data)
     dispatch({type:CREATE_SUBJECT_SUCCESS,payload:response.data})
     toast.success(`${response.data.name} Added Successufully`)
     return true
   }
   catch(error){
    dispatch({type:CREATE_SUBJECT_FAILURE,payload:error?.response?.data?.message || "Failed to add subject"})
    return false
   }
}

export const createCourse=(formData)=>async (dispatch)=>{
  for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
   dispatch({type:CREATE_COURSE_REQUEST})
   try{
     const response=await axios.post(buildUrl("/admin/createCourse"),formData,{headers:{
       "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
     console.log("=======---------============="+response?.data)
     dispatch({type:CREATE_COURSE_SUCCESS,payload:response?.data})
     toast.success("Course Created Successfully")
     return true
   }
   catch(error){
    dispatch({type:CREATE_COURSE_FAILURE,payload:error.response?.data?.message || "Failed to create course"})
    return false
   }
}

export const createBatch=(batch)=>async (dispatch)=>{
  console.log(batch)
  console.log("Batch==")
   dispatch({type:CREATE_BATCH_REQUEST})
   try{
     const response=await axios.post(buildUrl("/admin/createBatch"),batch,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
     console.log(response.data)
     dispatch({type:CREATE_BATCH_SUCCESS,payload:response.data})
     toast.success("Batch Created Successufully")
     return true
   }
   catch(error){
    dispatch({type:CREATE_BATCH_FAILURE,payload:error?.response?.data?.message || "Failed to create batch"})
    return false
   }
}

export const createLecturer=(lecturer,userId)=>async (dispatch)=>{
   dispatch({type:CREATE_LECTURER_FAILURE})
   try{
     const response=await axios.post(buildUrl(`/admin/createLecturer?userId=${userId}`),lecturer,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
     console.log(response.data)
     dispatch({type:CREATE_LECTURER_SUCCESS,payload:response.data})
   }
   catch(error){
    dispatch({type:CREATE_LECTURER_FAILURE,payload:error.response.data.message})
   }
}

export const assign=(assignData)=>async (dispatch)=>{
   dispatch({type:ASSIGN_REQUEST})
   try{
     const response=await axios.get(buildUrl(`/admin/assign?batchId=${assignData.batchId}&subjectId=${assignData.subjectId}&lecturerId=${assignData.lecturerId}`),{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
     console.log(response.data)
     dispatch({type:ASSIGN_SUCCESS,payload:response.data})
    
     toast(response.data)
     return true
   }
   catch(error){
    dispatch({type:ASSIGN_FAILURE,payload:error?.response?.data?.message || "Failed to assign"})
    return false
   }
}
