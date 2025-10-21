import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/authService";
import { SyncLoader } from "react-spinners";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loader,setLoader]=useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoader(true)
      await verifyOtp(email, otp);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setMessage("Invalid OTP. Please try again.");
    }
    setLoader(false)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full mb-3 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          >
           {loader?<SyncLoader color='white'/>:"Verify OTP"}
          </button>
        </form>
        {message && <p className="text-center mt-3 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOtp;
