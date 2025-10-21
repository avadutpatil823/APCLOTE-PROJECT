import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createClassrOOM } from "../../State/lecutrersState/Action";

const CreateClassRoom = () => {

  const location =useLocation()
  const {batchId}=location.state||null
  const dispatch=useDispatch()
  const [classRoomName, setClassRoomName] = useState("");
 const navigate=useNavigate()
  const {lecturerWork}=useSelector(store=>store)

  const [message, setMessage] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!classRoomName) {
      setMessage("Please enter a classroom name.");
      return;
    }

      dispatch(createClassrOOM(classRoomName,batchId))
      if(lecturerWork?.isloading){

      }else{
        navigate("/lecturerBatchs")
      }
      
      setClassRoomName(""); // Clear input
    } 
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Create ClassRoom
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Classroom Name"
          value={classRoomName}
          onChange={(e) => setClassRoomName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default CreateClassRoom;
