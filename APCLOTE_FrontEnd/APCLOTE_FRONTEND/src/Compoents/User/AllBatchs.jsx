import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Store/store";
import { getAllBatchs, getSearchedBatchs } from "../../State/BatchsAndCoursesAndSubjects/Action";
import { Link } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import Pagination from "./Pagination";
import BatchCard from "./BatchCard";

function AllBatches() {
  const [key, setKey] = useState("")
  const dispatch = useDispatch()
  const { batchs } = useSelector(store => store)
  // Fetch all batches
  const page = batchs.page
  const totalPages = batchs.totalPages

  // useEffect(() => {
  //   dispatch(getAllBatchs(page))
  // }, [dispatch]);

  useEffect(() => {
    if (key && key.trim() !== "") {
      dispatch(getSearchedBatchs(key));
    }
    else {
      dispatch(getAllBatchs(page))
    }

  }, [key, setKey, dispatch])

 const onPageChane=(num)=>{
  dispatch(getAllBatchs(num))
 }



  const ltBatchs = [...batchs.allBatchs].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  )


  // Handle search
  const handleSearch = (e) => {

  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Search Batch by Name..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 ">
        {batchs.allBatchs.length > 0 ? (
          batchs.allBatchs.map((batch) => (
            // <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition flex  justify-between mt-3">

            //   <div className="flex flex-col items-center justify-center gap-4 w-[30%] bg-blue-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition cart">
            //     <h2 className="text-3xl font-bold mb-3 text-blue-800">{batch.name}</h2>
            //     <div className="flex items-center justify-center mt-5">
            //       {localStorage.getItem("JWT") === null ? (
            //         <Link to={"/login"} className="py-3 px-15 bg-green-400 rounded-lg text-white hover:bg-green-600" >Enroll Now</Link>
            //       ) :
            //         (
            //           <Link to={"/createOrder"} className="py-3 px-15 bg-green-400 rounded-lg text-white hover:bg-green-600" state={{ batch }}>Enroll Now</Link>
            //         )
            //       }
            //     </div>
            //   </div>

            //   <div
            //     key={batch.id}
            //     className="flex gap-5 w-[65%]"
            //   >
            //     <div className="">

            //       <p>
            //         <strong>Start Date:</strong> {batch.startDate}
            //       </p>
            //       <p>
            //         <strong>Time:</strong> {batch.start_time} - {batch.end_time}
            //       </p>
            //       <div className="mt-3">
            //         <strong>Course:</strong> {batch.course?.name} (
            //         Duration: {batch.course?.duration} months, Fee: ₹{batch.course?.fee})
            //       </div>

            //       <div className="mt-3 flex gap-5">
            //         <div className="flex flex-col gap-2 w-[50%]">
            //           <strong>Subjects:</strong>
            //           <ul className="list-disc list-inside">
            //             {batch.course?.subjects?.map((sub) => (
            //               <li key={sub.id}>{sub.name}</li>
            //             ))}
            //           </ul>
            //         </div>

            //         <div className="w-[50%] mt-5">
            //           {batch?.course?.syllabusFilePath?.length > 0 &&(
            //           <IconButton color="primary">
                             
            //                   <a href={`http://localhost:9898/api/view?filePath=${encodeURIComponent(batch.course?.syllabusFilePath.replace(/\\/g, "/"))}`}
            //             className="py-3 px-5 bg-green-400 text-white rounded hover:bg-green-600 mt-3 text-xl"
            //           >
            //           <DownloadIcon />Syllabus
            //           </a>
            //                  </IconButton>
                     
            //          ) }
            //         </div>

            //       </div>
            //     </div>

            //     <div className="flex items-center justify-center ">
            //       <div className="mt-3">
            //         <strong>Lecturers--Subjects</strong>
            //         {batch.lecturers && batch.lecturers.length > 0 ? (
            //           <div className="overflow-x-auto mt-2">
            //             <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            //               <thead>
            //                 <tr className="bg-gray-200">
            //                   <th className="border border-gray-300 px-4 py-2">Lecturer Name</th>

            //                 </tr>
            //               </thead>
            //               <tbody>
            //                 {batch.lecturers?.map((lec) => (
            //                   <tr key={lec.id} className="hover:bg-gray-50">
            //                     <td className="border border-gray-300 px-4 py-2">
            //                       {lec?.user?.name || "N/A"}
            //                     </td>

            //                   </tr>
            //                 ))}
            //               </tbody>
            //             </table>
            //           </div>
            //         ) : (
            //           <p className="text-gray-600 ">No lecturers assigned yet.</p>
            //         )}
            //       </div>

            //       <div className="mt-3">
            //         <strong> :</strong>
            //         {batch.lecturerBatchSubjects && batch.lecturerBatchSubjects.length > 0 ? (
            //           <div className="overflow-x-auto mt-2">
            //             <table className="table-auto border-collapse border border-gray-300 w-full text-left">
            //               <thead>
            //                 <tr className="bg-gray-200">
            //                   <th className="border border-gray-300 px-4 py-2">Assigned Subject</th>

            //                 </tr>
            //               </thead>
            //               <tbody>
            //                 {batch.lecturerBatchSubjects?.map((lbs) => (
            //                   <tr key={lbs.id} className="hover:bg-gray-50">
            //                     <td className="border border-gray-300 px-4 py-2">
            //                       {lbs?.subject?.name || "N/A"}
            //                     </td>

            //                   </tr>
            //                 ))}
            //               </tbody>
            //             </table>
            //           </div>
            //         ) : (
            //           <p className="text-gray-600">No lecturers assigned yet.</p>
            //         )}
            //       </div>

            //     </div>



            //   </div>

               
                 
            // </div>
             
             <BatchCard batch={batch}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No batches found.
          </p>
        )}
      </div>



       
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChane}/>
    </div>

  );
}

export default AllBatches;
