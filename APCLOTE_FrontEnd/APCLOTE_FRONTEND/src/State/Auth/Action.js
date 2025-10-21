import { toast } from "react-toastify"
import { GETUSER_FAILURE, GETUSER_REQUEST, GETUSER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import axios from 'axios'
import { useNavigate } from "react-router-dom"



export const register=(userData)=>async (dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
  try{
   const response= await axios.post("http://localhost:9898/auth/register",userData)
   const user=response.data
   toast.success(JSON.stringify(user.name+" is Registered Successufully"))
   dispatch({type:REGISTER_SUCCESS,payload:user})
}
catch(error){
     toast.error(error.response.data.message)
     dispatch({type:REGISTER_FAILURE,payload:error.response.data.message})
}

}

export const login=(userData)=>async (dispatch)=>{
    
    dispatch({type:LOGIN_REQUEST})
  try{
    
   const response= await axios.post("http://localhost:9898/auth/login",userData)
   const jwt=response.data.token
   if( response.data.token){
       localStorage.setItem("JWT",JSON.stringify(jwt));
       dispatch({type:LOGIN_SUCCESS,payload:response.data});
     toast.success("Login Successfully")
   }
     else{
        dispatch({type:LOGIN_FAILURE,payload:error.response.data.message});
          toast.error("No User With This Email Found")
     }
         
    console.log(response.data)
    
     window.location.reload()
   
}
catch(error){
     toast.error("Failed To Login Check Credentials..")
    
     dispatch({type:LOGIN_FAILURE,payload:"Failed To Login"})
     
}

}

export const getUser=()=>async (dispatch)=>{
     if(localStorage.getItem("JWT")){
    dispatch({type:GETUSER_REQUEST})
  try{
    
   const response= await axios.get("http://localhost:9898/api/getUser",{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }})
    
   dispatch({type:GETUSER_SUCCESS,payload:response.data})
    localStorage.setItem("USER",JSON.stringify(response.data))
}
catch(error){
     toast.error(error.response.data.message)
     dispatch({type:GETUSER_FAILURE,payload:error.response.data.message})
}
     }
}

export const logOut=()=>(dispatch)=>{

     localStorage.removeItem("JWT");
     localStorage.removeItem("USER")
     dispatch(getUser())
     window.location.reload()
}


