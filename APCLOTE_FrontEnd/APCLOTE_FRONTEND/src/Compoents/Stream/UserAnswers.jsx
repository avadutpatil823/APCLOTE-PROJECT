import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitTest } from "../../State/lecutrersState/Action";

const UserAnswers = () => {

    const navigate=useNavigate()
    const location=useLocation()
    const {test}=location.state||null
    const dispatch=useDispatch()

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    
      // Convert answers object to ordered list of answers based on question order
      const userAnswers = test.questions.map((q) => answers[q.id] || "");
     dispatch(submitTest(test.id,userAnswers))
     navigate(-2)
    
     
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 ">
      <h2 className="text-2xl font-bold text-center mb-4">{test.name}</h2>
      <p className="text-gray-600 text-center mb-6">Date: {test.date}</p>

      {test.questions.map((q, index) => (
        <div key={q.id} className="mb-6 border-b pb-4">
          <p className="font-semibold mb-3">
            {index + 1}. {q.questionText}
          </p>

          {["opt-1", "opt-2", "opt-3", "opt-4"].map((optKey) => (
            <label key={optKey} className="block mb-2 cursor-pointer">
              <input
                type="radio"
                name={`q-${q.id}`}
                value={optKey}
                checked={answers[q.id] === optKey}
                onChange={() => handleChange(q.id, optKey)}
                className="mr-2"
              />
              {q[optKey.replace("-","")]}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Submit Test
      </button>

      {result && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">✅ Test Submitted!</h3>
          <pre className="text-sm mt-2 text-gray-800">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UserAnswers;
