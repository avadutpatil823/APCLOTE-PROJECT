import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const APCLOTEContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for contacting APCLOTE! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-16 px-6">
      {/* Header */}
      <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center opacity-0 animate-fadeIn">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-full md:w-[90%] lg:w-[80%]">
        {/* Left Section - Contact Info */}
        <div className="bg-blue-700 text-white p-10 flex flex-col justify-center gap-8 md:w-1/2 transform transition duration-700 hover:scale-105">
          <h3 className="text-3xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-blue-100 leading-relaxed">
            Have questions about our online courses, batches, or admissions?
            We’re here to help you every step of the way. Reach out to us using
            the form or contact details below.
          </p>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-white text-xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-white text-xl" />
              <span>support@apclote.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-white text-xl" />
              <span>APCLOTE Online Coaching, Pune, Maharashtra, India</span>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="p-10 md:w-1/2 bg-gray-50 transform transition duration-700 hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6">
            Send Us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Note */}
      <p className="text-gray-600 mt-10 text-center w-[90%] md:w-[60%]">
        At <strong>APCLOTE</strong>, we value your feedback and inquiries. Whether you’re a student
        looking to enroll or an educator interested in collaboration, our team
        is eager to connect with you and help you achieve your goals.
      </p>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default APCLOTEContact;
