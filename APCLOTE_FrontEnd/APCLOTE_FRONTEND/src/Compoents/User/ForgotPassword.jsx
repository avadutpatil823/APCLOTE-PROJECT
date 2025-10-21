import React, { useState } from "react";
import { sendOtp } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
   const [loader,setLoader]=useState(false)
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoader(true)
      await sendOtp(email);
      setMessage("OTP sent to your email!");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      setMessage("Error sending OTP. Please check your email.");
    }
    setLoader(false)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 w-full mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            {loader?<SyncLoader color='white'/>:"Send OTP"}
          </button>
        </form>
        {message && <p className="text-center mt-3 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
