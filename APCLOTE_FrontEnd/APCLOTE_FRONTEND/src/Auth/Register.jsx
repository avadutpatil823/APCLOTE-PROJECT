import React, { useState } from 'react'
import { register } from '../State/Auth/Action';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const Register = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "ROLE_USER",
    password: "",
    phono: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData))
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/3184655/pexels-photo-3184655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      }}
    >
      <div className="max-w-md w-full bg-white/1 backdrop-blur-md shadow-lg rounded-2xl p-10 border border-white/30">
        
        {/* Form Header */}
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Register
        </h2>

        {/* Already registered / info */}
        {auth?.user?.name && (
          <div className='bg-green-100/30 py-3 px-6 font-bold text-green-800 rounded-lg mb-4 text-center'>
            <p>Registration Successful!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Phone</label>
            <input
              type="text"
              name="phono"
              value={formData.phono}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full px-4 py-3 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className="w-full px-4 py-3 border border-white/50 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600/80 hover:bg-blue-700/80 text-white font-semibold py-3 rounded-lg transition duration-200 flex justify-center items-center gap-2"
          >
            {auth.isloading ? <SyncLoader color='white' size={8} /> : "Sign Up"}
          </button>

          {/* Link to Login */}
          <div className="text-white/90 text-center mt-2">
            <Link to="/login" className="hover:underline">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;
