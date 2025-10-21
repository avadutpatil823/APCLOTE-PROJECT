import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMyBatchs } from "../../State/BatchsAndCoursesAndSubjects/Action";
import store from "../../Store/store";
import { useNavigate } from "react-router-dom";
import StreamStuentBatchs from "./StreamStudentBatchs";

function MyBatches() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {batchs}=useSelector(store=>store)
  // Fetch batches from backend
  useEffect(() => {
    dispatch(getMyBatchs())
  }, [dispatch]);

  return (
    <div className="min-h-screen">
        <StreamStuentBatchs/>
    </div>
   
  );
}

export default MyBatches;
