import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createPo } from "../../State/POAndPayment/Action";
import { toast } from "react-toastify";

const CreateOrder = () => {
  const [orderDate, setOrderDate] = useState("");
  const location=useLocation()
  const {batch}=location.state||[]
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    // Format current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB"); // DD/MM/YYYY
    setOrderDate(formattedDate);
  }, []);

  const handleCreateOrder = () => {
       dispatch(createPo(batch.id))
       toast.success("order Created")
       navigate("/myPOs")
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Purchase Order
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Batch Name:</span>
          <span className="text-gray-900">{batch?.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Batch Price:</span>
          <span className="text-green-600 font-semibold">₹{batch?.course?.fee}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Order Date:</span>
          <span className="text-gray-900">{orderDate}</span>
        </div>
      </div>

      <button
        onClick={handleCreateOrder}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        Create Order
      </button>
    </div>
  );
};

export default CreateOrder;
