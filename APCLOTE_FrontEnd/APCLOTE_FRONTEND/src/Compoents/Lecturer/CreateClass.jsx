import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createClass } from "../../State/lecutrersState/Action";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { getLecturerBatchs } from "../../State/BatchsAndCoursesAndSubjects/Action";

const CreateClass = () => {
  const [zoomLink, setZoomLink] = useState("");
  const [className, setClassName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const { batchId, classRoomId, classRoom } = location.state || {};
  const navigate = useNavigate();
  const { lecturerWork } = useSelector((store) => store);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!zoomLink || !className || !date || !startTime || !endTime) {
      setMessage("Please fill in all fields.");
      return;
    }

    const success = await dispatch(
      createClass({
        zoomlink: zoomLink,
        className,
        date,
        starttime: startTime,
        endTime,
        classRoom,
      })
    );

    if (success) {
      await dispatch(getLecturerBatchs());
      navigate("/streamClassRoom", { state: { batchId, classRoomId } });
    }
  };

  return (
    <div className="page-shell">
      <form onSubmit={handleSubmit} className="form-shell surface-panel space-y-5">
        <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Class Scheduler</span>
        <h1 className="title-dark text-3xl">Create Class</h1>
        <input type="text" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} className="field-input" disabled={lecturerWork?.isloading} />
        <input type="text" placeholder="Zoom Link" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} className="field-input" disabled={lecturerWork?.isloading} />
        <div className="grid gap-4 md:grid-cols-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field-input" disabled={lecturerWork?.isloading} />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="field-input" disabled={lecturerWork?.isloading} />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="field-input" disabled={lecturerWork?.isloading} />
        </div>
        <button type="submit" disabled={lecturerWork?.isloading} className="primary-btn w-full disabled:opacity-70 disabled:cursor-not-allowed">
          <span className="flex items-center justify-center gap-3">
            {lecturerWork?.isloading ? <SyncLoader color="white" size={8} /> : null}
            <span>{lecturerWork?.isloading ? "Creating Class..." : "Create Class"}</span>
          </span>
        </button>
        {message && <p className="text-center subtle-text">{message}</p>}
      </form>
    </div>
  );
};

export default CreateClass;
