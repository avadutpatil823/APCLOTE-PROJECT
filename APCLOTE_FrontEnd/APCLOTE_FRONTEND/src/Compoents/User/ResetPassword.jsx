import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../api/authService";
import { SyncLoader } from "react-spinners";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
   const [loader,setLoader]=useState(false)
  const location = useLocation();
  const email = location.state?.email;

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      setLoader(true)
      await resetPassword(email, password);
      setMessage("Password reset successfully!");
    } catch (err) {
      setMessage("Error resetting password.");
    }
    setLoader(false)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 w-full mb-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 w-full mb-3 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
           {loader?<SyncLoader color='white'/>:"Reset Password"}
          </button>
        </form>
        {message && <p className="text-center mt-3 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
