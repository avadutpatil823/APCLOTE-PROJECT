import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PlusIconWithTooltip from "../User/PlusIconWithTooltip";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Store/store";

const StreamBatch = () => {
  const navigate=useNavigate()
  
    const location=useLocation()
  const {classRooms,batchName,batchId}=location.state||{}

   
    
   
    
const handleBack = () => navigate(-1);
  const handleForward = () => navigate(1);
     
  
 
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between">
         
          <Tooltip title="Go Back" placement="right">
        <IconButton
          onClick={handleBack}
          sx={{
            // position: 'fixed',
            // top: 50,
            // left: 20,
            // zIndex: 3000,
             height:"2rem",
            width:"2rem",
            backgroundColor: 'white',
            color: 'primary.main',
            boxShadow: 3,
            '&:hover': { backgroundColor: 'primary.light', color: 'white' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Tooltip>

        {JSON.parse(localStorage.getItem("USER")).role=="ROLE_LECTURER"&&(
          <Link to={"/createClassRoom"} state={{batchId}}>
            <div className="relative inline-block group " >
                {/* Plus Icon */}
                <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  <FiPlus size={24} />
                </button>
          
                {/* Tooltip */}
                <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 
                  bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                  transition-opacity pointer-events-none whitespace-nowrap">
                  Add New ClassRoom
                </span>
            </div>
         </Link>
        )}
         

          
             <h1 className="text-3xl font-semibold text-center mb-8 text-blue-700">
               {batchName}
            </h1>
            <p>.</p>
             <p>.</p>

        </div>
       
      

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {classRooms.length>0?classRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300"
          >
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {room.name}
            </h2>
            <Link
               to={"/streamClassRoom"}
               state={{classRoom:room}}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              View
            </Link>
          </div>
        )):(
            <div className="flex items-center justify-center h-[80vh] w-fuull">
                <Link to={"/"} className="bg-red-600-400 rounded-lg px-5 py-3">Something Went Wrong ,Back To Home</Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default StreamBatch;
