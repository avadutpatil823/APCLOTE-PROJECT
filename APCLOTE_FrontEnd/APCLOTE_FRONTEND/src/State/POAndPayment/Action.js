import axios from "axios"
import { CREATE_PO_FAILURE, CREATE_PO_REQUEST, CREATE_PO_SUCCESS, GETALL_PO_FAILURE, GETALL_PO_REQUEST, GETALL_PO_SUCCESS, GETMY_PO_FAILURE, GETMY_PO_REQUEST, GETMY_PO_SUCCESS, MAKE_PAYMENT_FAILURE, MAKE_PAYMENT_REQUEST, MAKE_PAYMENT_SUCCESS } from "./ActionType"
import { toast } from "react-toastify"



export const createPo=(batchId)=>async (dispatch)=>{
       dispatch({type:CREATE_PO_REQUEST})
       try{
       const response=await axios.get(`http://localhost:9898/api/createOrder?batchId=${batchId}`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
       console.log(response.data)
       toast("See Console...")
       dispatch({type:CREATE_PO_SUCCESS,payload:response?.data})
       }
       catch(error){
        dispatch({type:CREATE_PO_FAILURE,payload:error.response.data.message})
       }
}

export const getAllPos=()=>async (dispatch)=>{
       dispatch({type:GETALL_PO_REQUEST})
       try{
       const response=await axios.get(`http://localhost:9898/admin/getAllPos`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
       console.log(response.data)
       toast("See Console...")
       dispatch({type:GETALL_PO_SUCCESS,payload:response.data})
       }
       catch(error){
        dispatch({type:GETALL_PO_FAILURE,payload:error.response.data.message})
       }
}

export const getmyPos=()=>async (dispatch)=>{
       dispatch({type:GETMY_PO_REQUEST})
       try{
       const response=await axios.get(`http://localhost:9898/api/myPos`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
       console.log(response.data)
       dispatch({type:GETMY_PO_SUCCESS,payload:response.data})
       }
       catch(error){
        dispatch({type:GETMY_PO_FAILURE,payload:error.response.data.message})
       }
}

export const makePayment=(poId,upiId)=>async (dispatch)=>{
       dispatch({type:MAKE_PAYMENT_REQUEST})
       try{
       const response=await axios.get(`http://localhost:9898/api/doPayment?poId=${poId}&upiId=${upiId}`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
       console.log(response.data)
       response?.data?.status==="COMPLITED"? toast.success("Payment Done Course Enrolled Successufully")
       : toast.error("Payment Failed...")
       
       dispatch({type:MAKE_PAYMENT_SUCCESS,payload:response?.data})
       
       }
       catch(error){
        dispatch({type:MAKE_PAYMENT_FAILURE,payload:error.response.data.message})
        toast.success("Payment Failed.. Check Your Transaction")
       }
}