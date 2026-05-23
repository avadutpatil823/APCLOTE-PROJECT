import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createClassrOOM } from "../../State/lecutrersState/Action";
import { getLecturerBatchs } from "../../State/BatchsAndCoursesAndSubjects/Action";
import { SyncLoader } from "react-spinners";

const CreateClassRoom = () => {
  const location = useLocation();
  const { batchId } = location.state || null;
  const dispatch = useDispatch();
  const { lecturerWork } = useSelector((store) => store);
  const [classRoomName, setClassRoomName] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classRoomName) {
      setMessage("Please enter a classroom name.");
      return;
    }

    const success = await dispatch(createClassrOOM(classRoomName, batchId));
    if (success) {
      await dispatch(getLecturerBatchs());
      navigate("/streamBatch", { state: { batchId } });
    }
    setClassRoomName("");
  };

  return (
    <div className="page-shell">
      <form onSubmit={handleSubmit} className="form-shell surface-panel space-y-5">
        <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Lecturer Tools</span>
        <h1 className="title-dark text-3xl">Create ClassRoom</h1>
        <p className="subtle-text">Set up a dedicated room inside the batch before scheduling classes.</p>
        <input
          type="text"
          placeholder="Enter classroom name"
          value={classRoomName}
          onChange={(e) => setClassRoomName(e.target.value)}
          disabled={lecturerWork?.isloading}
          className="field-input"
        />
        <button type="submit" disabled={lecturerWork?.isloading} className="primary-btn w-full disabled:opacity-70 disabled:cursor-not-allowed">
          <span className="flex items-center justify-center gap-3">
            {lecturerWork?.isloading ? <SyncLoader color="white" size={8} /> : null}
            <span>{lecturerWork?.isloading ? "Creating ClassRoom..." : "Create"}</span>
          </span>
        </button>
        {message && <p className="text-center subtle-text">{message}</p>}
      </form>
    </div>
  );
};

export default CreateClassRoom;
