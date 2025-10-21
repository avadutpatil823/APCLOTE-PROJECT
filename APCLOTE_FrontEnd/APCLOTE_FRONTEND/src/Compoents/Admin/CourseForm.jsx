import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../../State/BatchsAndCoursesAndSubjects/Action";
import { createCourse } from "../../State/AddingOrCreating/Action";
import { toast } from "react-toastify";

const CreateCourseForm2 = () => {
  const [course, setCourse] = useState({
    name: "",
    duration: "",
    fee: "",
    subjects: []
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [syllabusFile, setSyllabusFile] = useState(null); // New state for file upload
  const dispatch = useDispatch();
  const { batchs } = useSelector((store) => store); // batchs.subjects holds all subjects

  // Fetch subjects from backend
  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Handle subject selection
  const handleSubjectsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );

    // Merge new selections with existing ones, avoid duplicates
    const newSelected = [...new Set([...selectedSubjects, ...selectedOptions])];
    setSelectedSubjects(newSelected);

    // Build subjects array for course
    const selectedObjs = batchs.subjects.filter((subj) =>
      newSelected.includes(subj.id)
    );
    setCourse({ ...course, subjects: selectedObjs });
  };

  // Remove subject from selection
  const handleRemoveSubject = (id) => {
    const updatedSubjects = selectedSubjects.filter((subjId) => subjId !== id);
    setSelectedSubjects(updatedSubjects);

    const selectedObjs = batchs.subjects.filter((subj) =>
      updatedSubjects.includes(subj.id)
    );
    setCourse({ ...course, subjects: selectedObjs });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSyllabusFile(e.target.files[0]);
  };

  // Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Append JSON as a string under key "course" (for @RequestBody)
  const courseData = {
    name: course.name,
    duration: course.duration,
    fee: course.fee,
    subjects: course.subjects,
  };
  formData.append("course", new Blob([JSON.stringify(courseData)], { type: "application/json" }));

  // Append the syllabus file under key "file"
  if (syllabusFile) {
    toast("Appending file:", syllabusFile.name);
    formData.append("file", syllabusFile);

     // Dispatch Redux action to send multipart data
     dispatch(createCourse(formData));

  // Reset the form
  setCourse({ name: "", duration: "", fee: "", subjects: [] });
  setSelectedSubjects([]);
  setSyllabusFile(null);
  } else {
    toast.error("⚠️ No file selected!");
  }
 
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Create Course</h2>

        {/* Course Name */}
        <label className="block mb-2 font-semibold">Course Name</label>
        <input
          type="text"
          name="name"
          value={course.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Course Name"
          required
        />

        {/* Duration */}
        <label className="block mb-2 font-semibold">Duration (in months)</label>
        <input
          type="number"
          name="duration"
          value={course.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Duration"
          required
        />

        {/* Fee */}
        <label className="block mb-2 font-semibold">Fee</label>
        <input
          type="number"
          name="fee"
          value={course.fee}
          onChange={handleChange}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Enter Fee"
          required
        />

        {/* Syllabus File */}
        <label className="block mb-2 font-semibold">Upload Syllabus File</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-xl mb-4"
          required
        />
        {syllabusFile && (
          <p className="text-sm text-green-700 mb-4">
            Selected File: {syllabusFile.name}
          </p>
        )}

        {/* Selected Subjects Tags */}
        {selectedSubjects.length > 0 && (
          <div className="mb-4">
            {batchs.subjects
              .filter((subj) => selectedSubjects.includes(subj.id))
              .map((subj) => (
                <span
                  key={subj.id}
                  className="inline-flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {subj.name}
                  <button
                    type="button"
                    className="ml-2 text-red-600 font-bold hover:text-red-800"
                    onClick={() => handleRemoveSubject(subj.id)}
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        )}

        {/* Subjects Multi-select Dropdown */}
        <label className="block mb-2 font-semibold">Select Subjects</label>
        <select
          multiple
          value={selectedSubjects.map(String)}
          onChange={handleSubjectsChange}
          className="w-full p-2 border rounded-xl mb-4"
        >
          {batchs.subjects.map((subj) => (
            <option key={subj.id} value={subj.id}>
              {subj.name}
            </option>
          ))}
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded-xl hover:bg-green-600"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm2;
