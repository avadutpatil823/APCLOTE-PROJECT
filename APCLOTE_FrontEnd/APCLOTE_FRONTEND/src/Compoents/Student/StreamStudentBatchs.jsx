import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import store from '../../Store/store'

const StreamStuentBatchs = () => {
    const {batchs}=useSelector(store=>store)
    const navigate=useNavigate()
   


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {batchs.myBatchs.length>0?batchs.myBatchs?.map((batch) => (
        <div key={batch?.id} className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-bold mb-2">{batch?.name}</h2>
          <p>
            <strong>Start Date:</strong> {batch?.startDate} 
          </p>
          <p>
            <strong>Time:</strong> {batch?.start_time} - {batch?.end_time}
          </p>

          <div className="mt-2">
            <strong>Course:</strong> {batch?.course?.name} (Duration: {batch?.course?.duration} months, Fee: ₹{batch?.course?.fee})
          </div>

         
           
          <div className="flex items-center justify-center mt-5">
                <Link to={"/streamBatch"} className="py-3 px-15 bg-green-400 rounded-lg text-white hover:bg-green-600" state={{classRooms: batch?.classRooms,batchName:batch?.name,batchId:batch?.id }}>View </Link>
              </div>
          
        </div>
      )):(
        <div className="flex items-center justify-center h-[80vh] w-[100vw]">
         <div className="flex flex-col items-center justify-center h-[80vh]  text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          You Have Not Enrolled to Any Batch
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Go Back to Home
        </button>
      </div>
        </div>
      )
    }
    </div>
  )
}

export default StreamStuentBatchs
