import { SUBJECTS_FAILURE } from "../BatchsAndCoursesAndSubjects/ActionType"
import { CREATE_TEST_FAILURE, CREATE_TEST_REQUEST, CREATE_TEST_SUCCESS, CREATECLASS_FAILURE, CREATECLASS_REQUEST, CREATECLASS_SUCCESS, CREATECLASSROOM_FAILURE, CREATECLASSROOM_REQUEST, CREATECLASSROOM_SUCCESS, SUBMIT_TEST_REQUEST, SUBMIT_TEST_SUCCESS, UPLOAD_NOTES_FAILURE, UPLOAD_NOTES_REQUEST, UPLOAD_NOTES_SUCCESS, UPLOAD_VIDEO_FAILURE, UPLOAD_VIDEO_SUCCESS } from "./ActionType"

const initialState={
    isloading:null,
    error:null,
    message:"",
    userTestAnswer:null
}

export const lecturerWorkReducer=(state=initialState,action)=>{
    switch(action.type){
        case CREATECLASSROOM_REQUEST:
        case CREATECLASS_REQUEST:
        case UPLOAD_VIDEO_FAILURE:
        case UPLOAD_NOTES_REQUEST:
        case CREATE_TEST_REQUEST:
        case SUBMIT_TEST_REQUEST:
            return {...state,isloading:true,error:null}
        case CREATECLASSROOM_SUCCESS:
        case CREATECLASS_SUCCESS:
        case UPLOAD_VIDEO_SUCCESS:
        case UPLOAD_NOTES_SUCCESS:
        case CREATE_TEST_SUCCESS:
            return {...state,isloading:false,error:null,message:action.payload}
        case SUBMIT_TEST_SUCCESS:
            return {...state,isloading:false,error:null,userTestAnswer:action.payload}
        case CREATECLASSROOM_FAILURE:
        case CREATECLASS_FAILURE:
        case UPLOAD_VIDEO_FAILURE:
        case UPLOAD_NOTES_FAILURE:
        case CREATE_TEST_FAILURE:
        case SUBJECTS_FAILURE:
            return {...state,isloading:false,error:action.payload}
        default:
            return state
    }
}