import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makePayment } from "../../State/POAndPayment/Action";

const Payment = () => {
  const [selectedUpi, setSelectedUpi] = useState("");
  const [upiId, setUpiId] = useState("");
  const location=useLocation()
  const {orderId}=location.state||null
  const dispatch=useDispatch()

  const upiOptions = ["PhonePe", "Google Pay", "Paytm", "BHIM"];

  const handlePay = async () => {
    dispatch(makePayment(orderId,upiId))
     
    
  };
   console.log(orderId)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Make Payment
        </h2>

        {/* UPI Options */}
        <div className="space-y-3 mb-6">
          <p className="text-gray-700 font-medium">Select UPI Option:</p>
          {upiOptions.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                selectedUpi === option
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="upi"
                value={option}
                checked={selectedUpi === option}
                onChange={(e) => setSelectedUpi(e.target.value)}
                className="text-blue-600"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>

        {/* UPI ID Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Enter UPI ID:
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="example@upi"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
