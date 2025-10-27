import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getmyPos } from "../../State/POAndPayment/Action";
import store from "../../Store/store";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const MyPurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {poAndPa}=useSelector(store=>store)
  useEffect(() => {
    // Fetch purchase orders from backend
       dispatch(getmyPos())
       
  }, [dispatch]);

  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">My Purchase Orders</h1>

      {poAndPa.myPos.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-gray-600">
            🚫 No Purchase Orders Created
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poAndPa.myPos.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Batch Name:{" "}
                <span className="font-normal">{order.batch?.name}</span>
              </h2>

              <p className="text-gray-700 mb-1">
                <span className="font-medium">Batch Fee:</span>{" "}
                ₹{order?.fee}
              </p>

              <p className="text-gray-700 mb-4">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-lg text-sm font-semibold ${
                    order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      :order.status === "FAILED"?"bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              {order.status === "PENDING" && (
                <Link
                  to={"/dopay"}
                  state={{poId:order.id}}
                  
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Pay Now
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchaseOrders;
