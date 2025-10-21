
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../State/AddingOrCreating/Action";
import store from "../../Store/store";

const AddSubjectForm = () => {
  const dispatch=useDispatch()
 const {auth}=useSelector(store=>store)
  const [subject, setSubject] = useState({ name: "" });

  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
     dispatch(addSubject(subject))
    

    
    setSubject({ name: "" }); // reset form
  };
       
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Add Subject</h2>

        {/* Subject Name */}
        <label className="block mb-2 font-semibold">Subject Name</label>
        <input
          type="text"
          name="name"
          value={subject.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Subject Name"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded-xl hover:bg-green-600"
        >
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubjectForm;
