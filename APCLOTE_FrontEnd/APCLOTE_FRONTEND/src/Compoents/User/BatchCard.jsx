import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaBookOpen, FaRupeeSign } from "react-icons/fa";

const BatchCard = ({ batch }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/batchDetails", { state: { batch } });
  };

  return (
    <div
      className="relative bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 border border-gray-200 w-[28vw] min-w-[300px]"
    >
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-6 text-center">
        <h2 className="text-2xl font-bold mb-1">{batch.name}</h2>
        <p className="text-sm opacity-90">{batch.course?.name}</p>
      </div>

      {/* Batch Details */}
      <div className="p-6 space-y-3 text-gray-700">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          <p>
            <strong>Start Date:</strong> {batch.startDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-blue-500" />
          <p>
            <strong>Time:</strong> {batch.start_time} - {batch.end_time}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FaBookOpen className="text-blue-500" />
          <p>
            <strong>Duration:</strong> {batch.course?.duration} months
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FaRupeeSign className="text-green-600" />
          <p className="text-lg font-semibold text-green-600">
            {batch.course?.fee}
          </p>
        </div>
      </div>

      {/* Divider Line */}
      <div className="mx-6 border-t border-gray-200"></div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 py-5 bg-gray-50">
        <button
          onClick={handleExplore}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
        >
          Explore
        </button>

        {localStorage.getItem("JWT") === null ? (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
          >
            Enroll Now
          </Link>
        ) : (
          <Link
            to="/createOrder"
            state={{ batch }}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition"
          >
            Enroll Now
          </Link>
        )}
      </div>

      {/* Subtle corner accent */}
      <div className="absolute -top-6 right-6 w-3 h-25 bg-white/55  rotate-135  shadow-md "></div>
       <div className="absolute -top-6 right-0 w-3 h-25 bg-white/55  rotate-135  shadow-md "></div>
      {/* <div className="relative w-24 h-6 bg-blue-600 text-white text-xs font-semibold flex items-center justify-center rotate-45 origin-top-right shadow-md">
      </div> */}
    </div>
  );
};

export default BatchCard;
