import React from "react";
import { useLocation } from "react-router-dom";

const Batch = () => {
   const location= useLocation()
   const {batch}=location.state ||{}
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Batch Info */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-3">{batch.name}</h1>
        <p className="text-gray-600">Batch ID: {batch.id}</p>
        <p className="text-gray-600">
          Start Date: <span className="font-semibold">{batch.startDate}</span>
        </p>
        <p className="text-gray-600">
          Time: {batch.start_time} - {batch.end_time}
        </p>
      </div>

      {/* Course Info */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Course Info</h2>
        <p><span className="font-semibold">Name:</span> {batch.course?.name}</p>
        <p><span className="font-semibold">Duration:</span> {batch.course?.duration} months</p>
        <p><span className="font-semibold">Fee:</span> ₹{batch.course?.fee}</p>
      </div>

      {/* Lecturers */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-3">Lecturers</h2>
        {batch.lecturers?.map((lecturer, idx) => (
          <div key={idx} className="border-b border-gray-200 py-2">
            <p><span className="font-semibold">Name:</span> {lecturer.user?.name}</p>
            <p><span className="font-semibold">Email:</span> {lecturer.user?.email}</p>
            <p><span className="font-semibold">Salary:</span> ₹{lecturer.salary}</p>
          </div>
        ))}
      </div>

      {/* Classrooms */}
      <div>
        <h2 className="text-xl font-semibold text-orange-700 mb-3">Classrooms</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batch.classRooms?.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-blue-600 mb-2">{room.name}</h3>
              {room.classes?.length > 0 ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {room.classes.map((cls) => (
                    <li key={cls.id}>
                      {cls.className} ({cls.date})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No classes yet</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Batch;
