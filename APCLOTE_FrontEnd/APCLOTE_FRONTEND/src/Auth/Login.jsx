import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../State/Auth/Action';
import { SyncLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  from-blue-100 to-blue-300  px-4"
    style={{
    backgroundImage: "url('https://images.pexels.com/photos/3184655/pexels-photo-3184655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
  }}>
      <div className="max-w-md w-full bg-white/1  backdrop-blur-md shadow-lg  rounded-2xl p-10 border border-white/30">
        
        {/* Already Signed In Message */}
        {localStorage.getItem("JWT") && (
          <div className='bg-green-100/30 py-3 px-6 font-bold text-green-800 rounded-lg mb-4 text-center'>
            <p>Your Sign In Is Done</p>
          </div>
        )}

        {/* Form Header */}
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Sign In to APCLOTE
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600/80 hover:bg-blue-700/80 text-white font-semibold py-3 rounded-lg transition duration-200 flex justify-center items-center gap-2"
          >
            {auth.isloading ? <SyncLoader color="white" size={8} /> : "Sign In"}
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm mt-2 text-white/90">
            <Link to="/forgot-password" className="hover:underline font-bold">Forgot Password?</Link>
            <Link to="/register" className="hover:underline font-bold">Don't Have an Account?</Link>
          </div>
          <p className='mx-auto text-white text-2xl font-bold'>or</p>
          <div className='flex gap-6 items-center justify-center'>
           <a href="http://localhost:9898/oauth2/authorization/google" className='text-blue-600 hover:text-white '> <FaGoogle size={30}/></a>
           <a href="http://localhost:9898/oauth2/authorization/github" className='text-blue-600 hover:text-white'> <FaGithub size={30}/></a>
           <a href="http://localhost:9898/oauth2/authorization/facebook" className='text-blue-600 hover:text-white'><FaFacebook size={30}/></a>

          </div>
        </form>

        {/* Optional Footer Note */}
        <p className="text-xs text-white/70 text-center mt-6">
          © {new Date().getFullYear()} APCLOTE Online Coaching. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login;
