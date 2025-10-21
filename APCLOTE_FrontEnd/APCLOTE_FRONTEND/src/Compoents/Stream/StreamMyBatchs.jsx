import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import store from '../../Store/store'
import axios from 'axios'

const StreamMyBatchs = ({lbs}) => {
    const {batchs,auth}=useSelector(store=>store)
    const navigate=useNavigate()
     
  
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {batchs.lecturerBatchs.length>0?batchs.lecturerBatchs?.map((batch) => (
        <div key={batch?.id} className=" shadow-lg rounded-lg p-5 bg-white relative">
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

          <div className='flex gap-5 '>
                 

                 <div className="mt-2">
                       <table className="table-auto border-collapse border border-gray-300  text-left">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Assigned Subjects</th>
                              </tr>
                            </thead>
                              <tbody>
                               
                       {lbs&&lbs.map((bs)=>(
                          bs.batchId===batch?.id&&( 
                                <tr key={bs.batchId}  className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2 ">{bs?.subject?.name}</td> 
                             </tr>
                          )
                       ))}
                        
                       </tbody>
                        </table>
                    </div>

                  <div className="flex items-center justify-center mt-5 absolute  bottom-16 right-20">
                <Link to={"/streamBatch"} className="py-3 px-15 bg-green-400 rounded-lg text-white hover:bg-green-600" state={{classRooms: batch?.classRooms,batchName:batch?.name,batchId:batch?.id }}>View </Link>
              </div>
          
          </div>

           
          
          
        </div>
      )):(
        <div className="flex items-center justify-center h-[80vh] w-[100vw]">
         <div className="flex flex-col items-center justify-center h-[80vh]  text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          You Have Not Assigned to Any Batch
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

export default StreamMyBatchs
