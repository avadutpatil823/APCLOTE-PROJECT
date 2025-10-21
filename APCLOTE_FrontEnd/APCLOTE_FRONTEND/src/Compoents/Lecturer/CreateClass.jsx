
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createClass } from "../../State/lecutrersState/Action";
import store from "../../Store/store";
import { SyncLoader } from "react-spinners";

const CreateClass = () => {
  const [zoomLink, setZoomLink] = useState("");
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  const dispatch=useDispatch()
  const location=useLocation()
  const {classRoom}=location.state||null
  const navigate=useNavigate()
  const {lecturerWork}=useSelector(store=>store)
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!zoomLink || !className || !date || !startTime || !endTime) {
      setMessage("Please fill in all fields.");
      return;
    }

   
    // Construct JSON object
    const classData = {
      zoomlink: zoomLink,
      className: className,
      date: date,
      starttime: startTime,
      endTime: endTime,
      classRoom:classRoom
    };
      dispatch(createClass(classData))
     
      if(lecturerWork?.isloading){

      }else{
        navigate("/lecturerBatchs")
      }
      
      // Reset form
      setZoomLink("");
      setClassName("");
      setDate("");
      setStartTime("");
      setEndTime("");
   
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Create Class
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Zoom Link"
          value={zoomLink}
          onChange={(e) => setZoomLink(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
            {lecturerWork?.isloading?<SyncLoader color="white" size={8} />:"Create Class"}   
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default CreateClass;
