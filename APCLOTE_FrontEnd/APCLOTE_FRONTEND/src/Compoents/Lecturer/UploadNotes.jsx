import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadNotes, uploadVideo } from "../../State/lecutrersState/Action";

const UploadNotes = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const location=useLocation()
 const {classId}=location.state||null
  const dispatch=useDispatch()
  const navigate=useNavigate()
   const {lecturerWork}=useSelector(store=>store)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !classId) {
      setMessage("Please fill all fields and select a video file.");
      return;
    }

      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadNotes(title,classId,formData))
     if(lecturerWork?.isloading){

      }else{
        navigate("/lecturerBatchs")
      }
      
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Upload Class Notes
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Notes title"
          />
        </div>

       

        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Select Notes File</label>
          <input
            type="file"
            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload Notes
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default UploadNotes;
