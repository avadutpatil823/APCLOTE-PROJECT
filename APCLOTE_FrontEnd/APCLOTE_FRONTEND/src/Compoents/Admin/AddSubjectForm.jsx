import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../../State/AddingOrCreating/Action";
import { SyncLoader } from "react-spinners";

const AddSubjectForm = () => {
  const dispatch = useDispatch();
  const { adding } = useSelector((store) => store);
  const [subject, setSubject] = useState({ name: "" });

  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(addSubject(subject));
    if (success) {
      setSubject({ name: "" });
    }
  };

  return (
    <div className="page-shell">
      <form onSubmit={handleSubmit} className="form-shell surface-panel space-y-5">
        <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Admin</span>
        <h2 className="title-dark text-3xl">Add Subject</h2>
        <p className="subtle-text">Create a subject so it can be attached to courses and later assigned within batches.</p>
        <div>
          <label className="field-label">Subject Name</label>
          <input type="text" name="name" value={subject.name} onChange={handleChange} className="field-input" placeholder="Enter subject name" required disabled={adding?.isloading} />
        </div>
        <button type="submit" disabled={adding?.isloading} className="primary-btn w-full disabled:opacity-70 disabled:cursor-not-allowed">
          <span className="flex items-center justify-center gap-3">
            {adding?.isloading ? <SyncLoader color="white" size={8} /> : null}
            <span>{adding?.isloading ? "Adding Subject..." : "Add Subject"}</span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddSubjectForm;
