import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getLecturers } from "../../State/LecturerAndUsers/Action";
import { buildUrl } from "../../config/api";

const UpdateLecturer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch()

  // Lecturer object coming from location.state
  const lecturerFromState = location.state?.lecturer;

  const [lecturer, setLecturer] = useState({
    id: "",
    user: { name: "", email: "" }, // nested user object
    dateOfJoining: "",
    salary: "",
    batches: [],
    lecturerBatchSubjects: [],
  });

  useEffect(() => {
    if (lecturerFromState) {
      setLecturer({
        ...lecturerFromState,
        dateOfJoining: lecturerFromState.dateOfJoining || "",
        salary: lecturerFromState.salary || "",
      });
    }
  }, [lecturerFromState]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecturer({ ...lecturer, [name]: value });
  };

  // Submit updated lecturer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending entire lecturer object to backend
      const token = JSON.parse(localStorage.getItem("JWT"));
      const response = await axios.post(
        buildUrl("/admin/updateLecturer"),
        lecturer,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Lecturer updated successfully");
      dispatch(getLecturers())
      navigate("/allLecturers"); // redirect to lecturer list page
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Update Lecturer
        </h2>

        {/* Name - not editable */}
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          value={lecturer.user.name || ""}
          disabled
          className="w-full p-2 border rounded-xl mb-4 bg-gray-200"
        />

        {/* Date of Joining */}
        <label className="block mb-2 font-semibold">Date of Joining</label>
        <input
          type="date"
          name="dateOfJoining"
          value={lecturer.dateOfJoining || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
        />

        {/* Salary */}
        <label className="block mb-2 font-semibold">Salary</label>
        <input
          type="number"
          name="salary"
          value={lecturer.salary || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
        >
          Update Lecturer
        </button>
      </form>
    </div>
  );
};

export default UpdateLecturer;
