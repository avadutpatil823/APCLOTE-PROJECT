import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../State/BatchsAndCoursesAndSubjects/Action";
import { createBatch } from "../../State/AddingOrCreating/Action";
import { SyncLoader } from "react-spinners";

const CreateBatchForm = () => {
  const [batch, setBatch] = useState({
    name: "",
    course: null,
    startDate: "",
    start_time: "",
    end_time: "",
  });

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const dispatch = useDispatch();
  const { batchs } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatch({ ...batch, [name]: value });
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const selectedCourse = batchs?.coursess?.find((c) => c.id === parseInt(courseId));
    setSelectedCourseId(courseId);
    setBatch({ ...batch, course: selectedCourse });
  };

  const { adding } = useSelector((store) => store);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(createBatch(batch));
    if (success) {
      setBatch({
        name: "",
        course: null,
        startDate: "",
        start_time: "",
        end_time: "",
      });
      setSelectedCourseId("");
    }
  };

  return (
    <div className="page-shell">
      <form onSubmit={handleSubmit} className="form-shell surface-panel space-y-5">
        <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Batch Setup</span>
        <h2 className="title-dark text-3xl">Create Batch</h2>
        <div>
          <label className="field-label">Batch Name</label>
          <input type="text" name="name" value={batch.name} onChange={handleChange} className="field-input" placeholder="Enter batch name" required disabled={adding?.isloading} />
        </div>
        <div>
          <label className="field-label">Select Course</label>
          <select value={selectedCourseId} onChange={handleCourseChange} className="field-select" required disabled={adding?.isloading}>
            <option value="">-- Select Course --</option>
            {batchs?.coursess?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} (Fee: {course.fee})
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="field-label">Start Date</label>
            <input type="date" name="startDate" value={batch.startDate} onChange={handleChange} className="field-input" required disabled={adding?.isloading} />
          </div>
          <div>
            <label className="field-label">Start Time</label>
            <input type="time" name="start_time" value={batch.start_time} onChange={handleChange} className="field-input" required disabled={adding?.isloading} />
          </div>
          <div>
            <label className="field-label">End Time</label>
            <input type="time" name="end_time" value={batch.end_time} onChange={handleChange} className="field-input" required disabled={adding?.isloading} />
          </div>
        </div>
        <button type="submit" disabled={adding?.isloading} className="primary-btn w-full disabled:opacity-70 disabled:cursor-not-allowed">
          <span className="flex items-center justify-center gap-3">
            {adding?.isloading ? <SyncLoader color="white" size={8} /> : null}
            <span>{adding?.isloading ? "Creating Batch..." : "Create Batch"}</span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default CreateBatchForm;
