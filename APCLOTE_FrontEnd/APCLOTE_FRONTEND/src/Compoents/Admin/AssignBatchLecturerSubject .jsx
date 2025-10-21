import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Store/store";
import { getLecturers } from "../../State/LecturerAndUsers/Action";
import { getAllBatchs, getSubjects } from "../../State/BatchsAndCoursesAndSubjects/Action";
import { assign } from "../../State/AddingOrCreating/Action";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignBatchLecturerSubject = () => {
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");

  const dispatch = useDispatch()
  const { lecturesAndUsers } = useSelector(store => store)
  const { batchs } = useSelector(store => store)
  const page=batchs.page
  const totalPages=batchs.totalPages
 

  

  // Fetch data from backend
  useEffect(() => {
     dispatch(getLecturers(page))
    dispatch(getAllBatchs(page))
    dispatch(getSubjects())
    
  }, [dispatch]);


  useEffect(() => {
     setBatches((prev)=>[...prev,...batchs.allBatchs])
     
    
  }, [batchs?.allBatchs]);

  
const handleScroll = (e) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target;

  // Scroll down → load next page
  if (scrollTop + clientHeight >= scrollHeight - 2) {
    if (page < totalPages) {
      console.log("⬇️ Reached bottom → loading next page:", page + 1);
      dispatch(getAllBatchs(page + 1))
     
    }
  }

};

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignData = {
      batchId: selectedBatch,
      subjectId: selectedSubject,
      lecturerId: selectedLecturer
    }
    dispatch(assign(assignData))

  };

 
 
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Assign Batch, Subject & Lecturer
        </h2>

        {/* Batch Dropdown */}
        <label className="block mb-2 font-semibold">Select Batch</label>
        <select
          value={selectedBatch}
          onScroll={handleScroll}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="w-full p-2 border rounded-xl mb-4"
          size="5"
          required
        >
          <option value="">-- Select Batch --</option>
          {batches?.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.name}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
        <label className="block mb-2 font-semibold">Select Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full p-2 border rounded-xl mb-4"
          required
        >
          <option value="">-- Select Subject --</option>
          {
            
            batchs?.allBatchs
              ?.filter((batch) => batch.id===Number(selectedBatch) )  //selectedBatch) // only selected batch
              ?.flatMap((batch) =>
                batch?.course?.subjects?.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}

                  </option>
                ))
              )
          }
        </select>

        {/* Lecturer Dropdown */}
        <label className="block mb-2 font-semibold">Select Lecturer</label>
        <select
          value={selectedLecturer}
          onChange={(e) => setSelectedLecturer(e.target.value)}
          className="w-full p-2 border rounded-xl mb-4"
          required
        >
          <option value="">-- Select Lecturer --</option>
          {lecturesAndUsers?.lecturers?.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.id}>
              {lecturer.user.name} - {lecturer.salary}
            </option>
          ))}
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded-xl hover:bg-green-600"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignBatchLecturerSubject;
