import React from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import store from "../../Store/store";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const StreamClassRoom = () => {
  
  const navigate=useNavigate()
  const location=useLocation()
  const {classRoom}=location.state||null
  

 const handleBack = () => navigate(-1);
 

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-white rounded-xl shadow-md min-h-screen">
      {/* Classroom Name */}
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
                   <Link to={"/createClass"} state={{classRoom}}>
                     <div className="relative inline-block group " >
                         {/* Plus Icon */}
                         <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                           <FiPlus size={24} />
                         </button>
                   
                         {/* Tooltip */}
                         <span className="absolute left-1/2 bottom-full mb-2 w-max transform -translate-x-1/2 
                           bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                           transition-opacity pointer-events-none whitespace-nowrap">
                           Add New Class
                         </span>
                     </div>
                  </Link>
                 )}

          
             <h1 className="text-3xl font-semibold text-center mb-8 text-blue-700">
               {classRoom?.name}
            </h1>
            <span>.</span>
            <p>.</p>
        </div>
       

      {/* List of Classes */}
      <div className="space-y-3">
        {classRoom.classes && classRoom.classes.length > 0 ? (
          classRoom.classes.map((cls) => (
            <div
              key={cls.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
            >
              <span className="font-medium">{cls.className}</span>
              <Link to={"/streamClass"} state={{classData:cls}} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                View
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No classes available</p>
        )}
      </div>
    </div>
  );
};

export default StreamClassRoom;
