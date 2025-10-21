import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const APCLOTEPricing = () => {
  const plans = [
    {
      name: "Starter Plan",
      price: "₹499 / month",
      description: "Perfect for individual learners and self-paced study.",
      features: [
        "Access to 50+ video lectures",
        "Basic quizzes and assignments",
        "Certificate after course completion",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Pro Plan",
      price: "₹999 / month",
      description: "Ideal for students and professionals looking for advanced learning and analytics.",
      features: [
        "All Starter features",
        "Access to 200+ courses",
        "Live mentor sessions",
        "Progress tracking dashboard",
        "Priority support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise Plan",
      price: "Custom Pricing",
      description: "For institutions and training organizations with multiple users.",
      features: [
        "All Pro features",
        "Institutional dashboard & analytics",
        "Custom course integration",
        "Dedicated account manager",
        "24/7 technical support",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20 text-gray-800">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Pricing Plans
        </h1>
        <p className="text-lg text-gray-600">
          Choose a plan that best fits your learning goals. Whether you're an individual or an institution, APCLOTE has something for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 ${
              plan.highlighted
                ? "bg-blue-600 text-white scale-105"
                : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-3xl font-semibold mb-4">{plan.price}</p>
            <p className={`mb-6 ${plan.highlighted ? "text-blue-100" : "text-gray-600"}`}>
              {plan.description}
            </p>
            <ul className="space-y-3 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaCheckCircle
                    className={`${
                      plan.highlighted ? "text-green-300" : "text-green-600"
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 w-full py-3 rounded-full font-semibold transition duration-300 ${
                plan.highlighted
                  ? "bg-white text-blue-700 hover:bg-blue-100"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {plan.name === "Enterprise Plan" ? "Contact Us" : "Get Started"}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-600 text-lg">
          Need a custom solution for your institute or organization?
        </p>
        <button className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition duration-300">
          Request a Demo
        </button>
      </div>
    </div>
  );
};

export default APCLOTEPricing;
