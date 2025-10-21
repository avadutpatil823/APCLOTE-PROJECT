import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import { FaChalkboardTeacher, FaBookOpen, FaUserGraduate, FaClock, FaCalendarAlt } from "react-icons/fa";

const BatchDetails = () => {
  const location = useLocation();
  const { batch } = location.state || {};
  const navigate = useNavigate();

  if (!batch) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-600">
        <p className="text-lg">No batch details found.</p>
        <Link
          to="/batches"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10 px-6 md:px-20 flex justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-10 px-8 text-center relative">
          <h1 className="text-4xl font-bold mb-3">{batch.name}</h1>
          <p className="text-lg opacity-90">{batch.course?.name}</p>
          <div className="absolute top-5 right-8 bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-md">
            {batch.startDate}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 flex flex-col lg:flex-row gap-10">
          {/* Left Panel */}
          <div className="lg:w-1/3 bg-blue-50 p-8 rounded-2xl shadow-inner space-y-5">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center border-b pb-3 border-blue-300">
              Batch Overview
            </h2>

            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-3">
                <FaCalendarAlt className="text-blue-600" /> 
                <strong>Start Date:</strong> {batch.startDate}
              </p>
              <p className="flex items-center gap-3">
                <FaClock className="text-blue-600" /> 
                <strong>Time:</strong> {batch.start_time} - {batch.end_time}
              </p>
              <p className="flex items-center gap-3">
                <FaUserGraduate className="text-blue-600" />
                <strong>Duration:</strong> {batch.course?.duration} months
              </p>
              <p className="flex items-center gap-3">
                <FaBookOpen className="text-blue-600" />
                <strong>Fee:</strong> ₹{batch.course?.fee}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 items-center">
              {localStorage.getItem("JWT") === null ? (
                <Link
                  to="/login"
                  className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-full font-semibold text-center shadow-md transition"
                >
                  Enroll Now
                </Link>
              ) : (
                <Link
                  to="/createOrder"
                  state={{ batch }}
                  className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-full font-semibold text-center shadow-md transition"
                >
                  Enroll Now
                </Link>
              )}
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-full py-3 rounded-full font-semibold transition"
              >
                Go Back
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:w-2/3 space-y-8">
            {/* Course Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                <FaBookOpen /> Course Details
              </h3>
              <p><strong>Course:</strong> {batch.course?.name}</p>
              <p><strong>Duration:</strong> {batch.course?.duration} months</p>
              <p><strong>Fee:</strong> ₹{batch.course?.fee}</p>

              {batch.course?.syllabusFilePath && (
                <div className="mt-5">
                  <IconButton color="primary">
                    <a
                      href={`http://localhost:9898/api/view?filePath=${encodeURIComponent(
                        batch.course?.syllabusFilePath.replace(/\\/g, "/")
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:bg-green-600 transition"
                    >
                      <DownloadIcon /> Download Syllabus
                    </a>
                  </IconButton>
                </div>
              )}
            </div>

            {/* Subjects */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                Subjects Covered
              </h3>
              {batch.course?.subjects?.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {batch.course.subjects.map((sub) => (
                    <li key={sub.id}>{sub.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No subjects available.</p>
              )}
            </div>

            {/* Lecturer and Assigned Subjects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lecturers */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                  <FaChalkboardTeacher /> Lecturers
                </h3>
                {batch.lecturers && batch.lecturers.length > 0 ? (
                  <ul className="space-y-2 text-gray-700">
                    {batch.lecturers.map((lec) => (
                      <li key={lec.id} className="bg-gray-50 py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                        {lec?.user?.name || "N/A"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No lecturers assigned yet.</p>
                )}
              </div>

              {/* Assigned Subjects */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Assigned Subjects
                </h3>
                {batch.lecturerBatchSubjects &&
                batch.lecturerBatchSubjects.length > 0 ? (
                  <ul className="space-y-2 text-gray-700">
                    {batch.lecturerBatchSubjects.map((lbs) => (
                      <li key={lbs.id} className="bg-gray-50 py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                        {lbs?.subject?.name || "N/A"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No assigned subjects yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
