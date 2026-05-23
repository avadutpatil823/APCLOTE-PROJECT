import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects } from "../../State/BatchsAndCoursesAndSubjects/Action";
import { createCourse } from "../../State/AddingOrCreating/Action";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

const CreateCourseForm2 = () => {
  const [course, setCourse] = useState({
    name: "",
    duration: "",
    fee: "",
    subjects: [],
  });

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const dispatch = useDispatch();
  const { batchs, adding } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubjectsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    const newSelected = [...new Set([...selectedSubjects, ...selectedOptions])];
    setSelectedSubjects(newSelected);
    const selectedObjs = batchs.subjects.filter((subj) =>
      newSelected.includes(subj.id)
    );
    setCourse({ ...course, subjects: selectedObjs });
  };

  const handleRemoveSubject = (id) => {
    const updatedSubjects = selectedSubjects.filter((subjId) => subjId !== id);
    setSelectedSubjects(updatedSubjects);
    const selectedObjs = batchs.subjects.filter((subj) =>
      updatedSubjects.includes(subj.id)
    );
    setCourse({ ...course, subjects: selectedObjs });
  };

  const handleFileChange = (e) => {
    setSyllabusFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const courseData = {
      name: course.name,
      duration: course.duration,
      fee: course.fee,
      subjects: course.subjects,
    };
    formData.append("course", new Blob([JSON.stringify(courseData)], { type: "application/json" }));

    if (syllabusFile) {
      formData.append("file", syllabusFile);
      const success = await dispatch(createCourse(formData));
      if (success) {
        setCourse({ name: "", duration: "", fee: "", subjects: [] });
        setSelectedSubjects([]);
        setSyllabusFile(null);
      }
    } else {
      toast.error("No file selected!");
    }
  };

  return (
    <div className="page-shell">
      <form onSubmit={handleSubmit} className="form-shell surface-panel space-y-5" encType="multipart/form-data">
        <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Course Setup</span>
        <h2 className="title-dark text-3xl">Create Course</h2>
        <div>
          <label className="field-label">Course Name</label>
          <input type="text" name="name" value={course.name} onChange={handleChange} className="field-input" placeholder="Enter course name" required disabled={adding?.isloading} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="field-label">Duration (months)</label>
            <input type="number" name="duration" value={course.duration} onChange={handleChange} className="field-input" placeholder="Enter duration" required disabled={adding?.isloading} />
          </div>
          <div>
            <label className="field-label">Fee</label>
            <input type="number" name="fee" value={course.fee} onChange={handleChange} className="field-input" placeholder="Enter fee" required disabled={adding?.isloading} />
          </div>
        </div>
        <div>
          <label className="field-label">Upload Syllabus File</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="field-file" required disabled={adding?.isloading} />
          {syllabusFile && <p className="subtle-text mt-2">Selected file: {syllabusFile.name}</p>}
        </div>

        {selectedSubjects.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {batchs.subjects
              .filter((subj) => selectedSubjects.includes(subj.id))
              .map((subj) => (
                <span key={subj.id} className="pill-tag">
                  {subj.name}
                  <button type="button" className="font-black" onClick={() => handleRemoveSubject(subj.id)} disabled={adding?.isloading}>
                    x
                  </button>
                </span>
              ))}
          </div>
        )}

        <div>
          <label className="field-label">Select Subjects</label>
          <select multiple value={selectedSubjects.map(String)} onChange={handleSubjectsChange} className="field-select min-h-[180px]" disabled={adding?.isloading}>
            {batchs.subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={adding?.isloading} className="primary-btn w-full disabled:opacity-70 disabled:cursor-not-allowed">
          <span className="flex items-center justify-center gap-3">
            {adding?.isloading ? <SyncLoader color="white" size={8} /> : null}
            <span>{adding?.isloading ? "Creating Course..." : "Create Course"}</span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm2;
