import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserGraduate,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { buildApiUrl } from "../../config/api";

const BatchDetails = () => {
  const location = useLocation();
  const { batch } = location.state || {};
  const navigate = useNavigate();

  if (!batch) {
    return (
      <div className="page-shell">
        <div className="page-content empty-state">
          <div className="content-card empty-card">
            <p className="text-lg subtle-text">No batch details found.</p>
            <Link to="/allBatchs" className="primary-btn mt-5">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-content space-y-8">
        <section className="section-hero">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="eyebrow">Batch Overview</span>
              <h1 className="section-title mt-5">{batch.name}</h1>
              <p className="section-subtitle mt-4 max-w-2xl">
                {batch.course?.name} with guided sessions, supporting notes, tests,
                and a structured learning flow built around the batch schedule.
              </p>
            </div>
            <div className="surface-panel p-6 min-w-[260px] text-slate-100 bg-white/8 border-white/10">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-100">Starts</p>
              <p className="text-3xl font-bold mt-2">{batch.startDate}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-panel p-8">
            <h2 className="title-dark text-2xl mb-6">Batch Snapshot</h2>
            <div className="space-y-5 text-slate-700">
              <p className="flex items-center gap-3">
                <FaCalendarAlt className="text-teal-600" />
                <strong>Start Date:</strong> {batch.startDate}
              </p>
              <p className="flex items-center gap-3">
                <FaClock className="text-teal-600" />
                <strong>Time:</strong> {batch.start_time} - {batch.end_time}
              </p>
              <p className="flex items-center gap-3">
                <FaUserGraduate className="text-teal-600" />
                <strong>Duration:</strong> {batch.course?.duration} months
              </p>
              <p className="flex items-center gap-3">
                <FaBookOpen className="text-amber-600" />
                <strong>Fee:</strong> Rs {batch.course?.fee}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {localStorage.getItem("JWT") === null ? (
                <Link to="/login" className="secondary-btn">
                  Enroll Now
                </Link>
              ) : (
                <Link to="/createOrder" state={{ batch }} className="secondary-btn">
                  Enroll Now
                </Link>
              )}
              <button onClick={() => navigate(-1)} className="ghost-btn">
                Go Back
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="content-card p-6">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                <FaBookOpen /> Course Details
              </h3>
              <p><strong>Course:</strong> {batch.course?.name}</p>
              <p><strong>Duration:</strong> {batch.course?.duration} months</p>
              <p><strong>Fee:</strong> Rs {batch.course?.fee}</p>

              {batch.course?.syllabusFilePath && (
                <div className="mt-5">
                  <a
                    href={buildApiUrl(`/view?filePath=${encodeURIComponent(
                      batch.course?.syllabusFilePath.replace(/\\/g, "/")
                    )}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="primary-btn w-fit"
                  >
                    <DownloadIcon /> Download Syllabus
                  </a>
                </div>
              )}
            </div>

            <div className="content-card p-6">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">Subjects Covered</h3>
              {batch.course?.subjects?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {batch.course.subjects.map((sub) => (
                    <span key={sub.id} className="pill-tag">
                      {sub.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="subtle-text">No subjects available.</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="content-card p-6">
                <h3 className="text-2xl font-semibold text-teal-800 mb-4 flex items-center gap-2">
                  <FaChalkboardTeacher /> Lecturers
                </h3>
                {batch.lecturers && batch.lecturers.length > 0 ? (
                  <ul className="space-y-3 text-gray-700">
                    {batch.lecturers.map((lec) => (
                      <li key={lec.id} className="rounded-2xl bg-stone-50 px-4 py-3 border border-stone-200">
                        {lec?.user?.name || "N/A"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="subtle-text">No lecturers assigned yet.</p>
                )}
              </div>

              <div className="content-card p-6">
                <h3 className="text-2xl font-semibold text-teal-800 mb-4">Assigned Subjects</h3>
                {batch.lecturerBatchSubjects && batch.lecturerBatchSubjects.length > 0 ? (
                  <ul className="space-y-3 text-gray-700">
                    {batch.lecturerBatchSubjects.map((lbs) => (
                      <li key={lbs.id} className="rounded-2xl bg-stone-50 px-4 py-3 border border-stone-200">
                        {lbs?.subject?.name || "N/A"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="subtle-text">No assigned subjects yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BatchDetails;
