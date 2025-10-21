import axios from "axios"
import { CREATECLASS_FAILURE, CREATECLASS_REQUEST, CREATECLASS_SUCCESS, CREATECLASSROOM_FAILURE, CREATECLASSROOM_REQUEST, CREATECLASSROOM_SUCCESS, SUBMIT_TEST_REQUEST, SUBMIT_TEST_SUCCESS } from "./ActionType"
import { toast } from "react-toastify"
import { SUBJECTS_SUCCESS } from "../BatchsAndCoursesAndSubjects/ActionType"


export const createClassrOOM=(name,batchId)=>async (dispatch)=>{
    dispatch({type:CREATECLASSROOM_REQUEST})
   
    try{
   const response= await axios.get(`http://localhost:9898/lecturer/createClassRoom?name=${encodeURIComponent(name)}&batchId=${batchId}`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:CREATECLASSROOM_SUCCESS,payload:"ClassRoom Created Succesufully"})
    toast.success("ClassRoom Created Successufully")
    }
    catch(error){
        dispatch({type:CREATECLASSROOM_FAILURE,payload:error.response.data.message})
         toast.error("Failed To Created ClassRoom")
    }
}

export const createClass=(class1)=>async (dispatch)=>{
    dispatch({type:CREATECLASS_REQUEST})
    console.log(class1)
    try{
   const response= await axios.post(`http://localhost:9898/lecturer/createClass`,class1,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:CREATECLASS_SUCCESS,payload:"Class Created Succesufully"})
    toast.success("Class Created Successufully")
    }
    catch(error){
        dispatch({type:CREATECLASS_FAILURE,payload:error.response.data.message})
        toast.error(" Failed To Create Class")
    }
    
}

export const uploadVideo=(title,classId,formData)=>async (dispatch)=>{
    dispatch({type:CREATECLASSROOM_REQUEST})
    try{
   const response= await axios.post(`http://localhost:9898/lecturer/uploadVideo?title=${encodeURIComponent(title)}&classId=${classId}`,formData,{headers:{
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:CREATECLASSROOM_SUCCESS,payload:"Video Uploaded Succesufully"})
    toast.success("Video uploaded Successfully")
    }
    catch(error){
        dispatch({type:CREATECLASSROOM_FAILURE,payload:error.response.data.message})
        toast.error("Failed To Upload..")
    }
}

export const uploadNotes=(title,classId,formData)=>async (dispatch)=>{
    dispatch({type:CREATECLASSROOM_REQUEST})
    try{
   const response= await axios.post(`http://localhost:9898/lecturer/uploadNotes?title=${encodeURIComponent(title)}&classId=${classId}`,formData,{headers:{
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:CREATECLASSROOM_SUCCESS,payload:"Notes Uploaded Succesufully"})
    toast.success("Notes Uploaded Successfully")
    }
    catch(error){
        dispatch({type:CREATECLASSROOM_FAILURE,payload:error.response.data.message})
        toast.error("Failed to Upload Notes")
    }
}

export const createTest=(test,classId)=>async (dispatch)=>{
    dispatch({type:CREATECLASSROOM_REQUEST})
    
    try{
   const response= await axios.post(`http://localhost:9898/lecturer/crateTest?classId=${classId}`,test,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    console.log(response.data)
    dispatch({type:CREATECLASSROOM_SUCCESS,payload:"Test Created Succesufully"})
    toast.success("Test Created Successfully")
    }
    catch(error){
        dispatch({type:CREATECLASSROOM_FAILURE,payload:error.response.data.message})
        toast.error("Failed To Create Test")
    }
}

export const submitTest=(testId,userAnswers)=>async (dispatch)=>{
    dispatch({type:SUBMIT_TEST_REQUEST})
    
    try{
   const response= await axios.get(`http://localhost:9898/api/submitTest?testId=${testId}&userAnswers=${userAnswers}`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})

    console.log(response.data)
   
    dispatch({type:SUBMIT_TEST_SUCCESS,payload:response.data})
     response.data.test==null?toast.error("AllReady Submitted Cant Submit Again"):toast.success("Test Submitted Successfully")
     
    }
    catch(error){
        dispatch({type:SUBMIT_TEST_REQUEST,payload:error.response.data.message})
        toast.error("Failed To Submit The Test")
    }
}