import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTest } from "../../State/lecutrersState/Action";

const CreateTest = () => {
  const location=useLocation()
   const {classId}=location.state||null
   const dispatch=useDispatch()
   const navigate=useNavigate()
  const [name, setName] = useState("");
   const {lecturerWork}=useSelector(store=>store)
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
      keyAnswer: "",
    },
  ]);

  // Add new empty question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        keyAnswer: "",
      },
    ]);
  };

  // Handle input change for test name or class ID
  const handleChange = (e) => {
   setName(e.target.value)
   
  };

  // Handle question changes
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  // Submit test data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const testData = {
      name,
      questions,
    };
    dispatch(createTest(testData,classId))
     if(lecturerWork?.isloading){

      }else{
        navigate("/lecturerBatchs")
      }
    

  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
        Create New Test
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Test Info */}
       

        <div>
          <label className="block font-medium">Test Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
            placeholder="e.g., Class-1-Test-1-Language Syntax"
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        {/* Questions Section */}
        <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
        {questions.map((q, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-50">
            <label className="block font-medium">
              Question {index + 1} Text:
            </label>
            <input
              type="text"
              name="questionText"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, e)}
              required
              className="border w-full p-2 rounded mt-1"
            />

            {[1, 2, 3, 4].map((num) => (
              <div key={num}>
                <label className="block mt-2">Option {num}:</label>
                <input
                  type="text"
                  name={`opt${num}`}
                  value={q[`opt-${num}`]}
                  onChange={(e) => handleQuestionChange(index, e)}
                  required
                  className="border w-full p-2 rounded"
                />
              </div>
            ))}

            <div className="mt-3">
              <label className="block font-medium">Correct Answer Key:</label>
              <select
                name="keyAnswer"
                value={q.keyAnswer}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="border w-full p-2 rounded"
              >
                <option value="">-- Select Correct Option --</option>
                <option value="opt-1">Option 1</option>
                <option value="opt-2">Option 2</option>
                <option value="opt-3">Option 3</option>
                <option value="opt-4">Option 4</option>
              </select>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            ➕ Add Question
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            🚀 Create Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTest;
