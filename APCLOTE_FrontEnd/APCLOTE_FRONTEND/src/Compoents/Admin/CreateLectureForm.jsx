import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import { buildUrl } from "../../config/api";

const CreateLecturerForm = () => {
  const [pass,setPass]=useState("")
  const [loader,setLoader]=useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "ROLE_LECTURER",
    password: "",
    phono: "",
    address: ""
  });

  const [lecturer, setLecturer] = useState({
    salary: "",
    dateOfJoining: ""
  });

  // Handle input changes
  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const passwordChange=(e)=>{
    setPass(e.target.value)
  }

  const handleLecturerChange = (e) => {
    setLecturer({ ...lecturer, [e.target.name]: e.target.value });
  };

  // Submit form (Register User -> Create Lecturer)
  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();

    try {
      // 1. Register User
      const userRes = await fetch(buildUrl("/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (!userRes.ok) throw new Error("Failed to register user");
      const savedUser = await userRes.json();
      console.log("User Registered:", savedUser);

      // 2. Create Lecturer with userId
      const lecturerRes = await fetch(
        buildUrl(`/admin/createLecturer?userId=${savedUser.id}&sender=${pass}`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
          },
          body: JSON.stringify(lecturer)
        }
      );

      if (!lecturerRes.ok) throw new Error("Failed to create lecturer");
      const savedLecturer = await lecturerRes.json();
      console.log("Lecturer Created:", savedLecturer);
       setLoader(false)
      toast.success("Lecturer Created Successfully!");

      // Reset form
      setUser({
        name: "",
        email: "",
        role: "ROLE_LECTURER",
        password: "",
        phono: "",
        address: ""
      });
      setLecturer({
        salary: "",
        dateOfJoining: ""
      });
    } catch (err) {
      console.error("Error:", err);
      setLoader(false)
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Create Lecturer
        </h2>

        {/* User Info */}
        <label className="block mb-2 font-semibold">Full Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleUserChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Name"
          required
          disabled={loader}
        />

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleUserChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Email"
          required
          disabled={loader}
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e)=>{
            handleUserChange(e);
            passwordChange(e);
          }}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Password"
          required
          disabled={loader}
        />

        <label className="block mb-2 font-semibold">Phone</label>
        <input
          type="text"
          name="phono"
          value={user.phono}
          onChange={handleUserChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Phone"
          required
          disabled={loader}
        />

        <label className="block mb-2 font-semibold">Address</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleUserChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Address"
          required
          disabled={loader}
        />

        {/* Lecturer Info */}
        <label className="block mb-2 font-semibold">Salary</label>
        <input
          type="number"
          name="salary"
          value={lecturer.salary}
          onChange={handleLecturerChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Salary"
          required
          disabled={loader}
        />

        <label className="block mb-2 font-semibold">Date of Joining</label>
        <input
          type="date"
          name="dateOfJoining"
          value={lecturer.dateOfJoining}
          onChange={handleLecturerChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
          disabled={loader}
        />

        {/* Submit */}
       
        <button
          type="submit"
          disabled={loader}
          className="w-full bg-green-400 text-white py-2 rounded-xl hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loader? <SyncLoader color='white'/>:"Create Lecturer"} 
        </button>
      </form>
    </div>
  );
};

export default CreateLecturerForm;
