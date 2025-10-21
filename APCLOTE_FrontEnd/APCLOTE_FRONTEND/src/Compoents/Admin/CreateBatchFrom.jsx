
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../State/BatchsAndCoursesAndSubjects/Action";
import { toast } from "react-toastify";
import { createBatch } from "../../State/AddingOrCreating/Action";
import { useNavigate } from "react-router-dom";

const CreateBatchForm = () => {
  const [batch, setBatch] = useState({
    name: "",
    course: null,
    startDate: "",
    start_time: "",
    end_time: "",
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const dispatch=useDispatch()
  const {batchs}=useSelector(store=>store)
  const navigate=useNavigate()

  // Fetch courses from backend
  useEffect(() => {
    dispatch(getCourses())
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatch({ ...batch, [name]: value });
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const selectedCourse = batchs?.coursess?.find((c) => c.id === parseInt(courseId));
    setSelectedCourseId(courseId);
    setBatch({ ...batch, course: selectedCourse });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
      
         dispatch(createBatch(batch))
         

        // reset form
        setBatch({
          name: "",
          course: null,
          startDate: "",
          start_time: "",
          end_time: "",
        });
        setSelectedCourseId("");
       
      
  };
   
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Create Batch</h2>

        {/* Batch Name */}
        <label className="block mb-2 font-semibold">Batch Name</label>
        <input
          type="text"
          name="name"
          value={batch.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Batch Name"
          required
        />

        {/* Select Course */}
        <label className="block mb-2 font-semibold">Select Course</label>
        <select
          value={selectedCourseId}
          onChange={handleCourseChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
        >
          <option value="">-- Select Course --</option>
          {batchs?.coursess?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name} (Fee: {course.fee})
            </option>
          ))}
        </select>

        {/* Start Date */}
        <label className="block mb-2 font-semibold">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={batch.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
        />

        {/* Start Time */}
        <label className="block mb-2 font-semibold">Start Time</label>
        <input
          type="time"
          name="start_time"
          value={batch.start_time}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
        />

        {/* End Time */}
        <label className="block mb-2 font-semibold">End Time</label>
        <input
          type="time"
          name="end_time"
          value={batch.end_time}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded-xl hover:bg-green-600"
        >
          Create Batch
        </button>
      </form>
    </div>
  );
};

export default CreateBatchForm;
