import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const {poId}=location.state
  const [loading, setLoading] = useState(false);
     
  const handlePayment = async () => {
    setLoading(true);
    try {
      // create order on server
      const res = await axios.get(`http://localhost:9898/api/payment/createOrder?poId=${poId}`,{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }});
      console.log(res)
      const { orderId, amount, currency, key, purchaseOrderId } = res.data;

      const options = {
        key: key,
        amount: Math.round(amount * 100), // paise
        currency: currency,
        name: "APCLOTE Online Coaching",
        description: "Course purchase",
        order_id: orderId,
        handler: async function (response) {
          // response has razorpay_payment_id, razorpay_order_id, razorpay_signature
          try {
            const verifyRes = await axios.post("http://localhost:9898/api/payment/verify", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              purchaseOrderId: purchaseOrderId
            },{headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("JWT"))}`
    }});

            if (verifyRes.data.status === "success") {
              alert("✅ Payment successful and verified!");
              navigate("/myBatchs")

            } else {
              alert("⚠️ Payment succeeded but verification failed.");
               navigate("/myBatchs")
            }
          } catch (err) {
            console.error("verification error", err);
            alert("Verification request failed");
          }
        },
        prefill: {
          name: "Avadut Patil",
          email: "test@example.com",
          contact: "9999999999"
        },
        notes: {
          purchase_order_id: purchaseOrderId
        },
        theme: {
          color: "#1a237e"
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        console.error(response.error);
        alert("Payment failed: " + response.error.description);
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Unable to create order");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Pay for batch {poId}</h2>
      <button disabled={loading} onClick={handlePayment} className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
