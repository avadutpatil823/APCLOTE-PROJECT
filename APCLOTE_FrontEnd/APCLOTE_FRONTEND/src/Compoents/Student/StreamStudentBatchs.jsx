import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const StreamStuentBatchs = () => {
  const { batchs } = useSelector((store) => store);
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <div className="page-content space-y-6">
        <section className="surface-panel p-6 md:p-8">
          <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Student Space</span>
          <h1 className="title-dark mt-4">My Enrolled Batches</h1>
          <p className="subtle-text mt-3">Open any batch to enter the class rooms, watch content, and continue learning.</p>
        </section>

        {batchs.myBatchs.length > 0 ? (
          <div className="grid-auto-fit">
            {batchs.myBatchs?.map((batch) => (
              <div key={batch?.id} className="dashboard-card p-6 space-y-3">
                <h2 className="text-2xl font-bold">{batch?.name}</h2>
                <p><strong>Start Date:</strong> {batch?.startDate}</p>
                <p><strong>Time:</strong> {batch?.start_time} - {batch?.end_time}</p>
                <div>
                  <strong>Course:</strong> {batch?.course?.name}
                  <p className="subtle-text mt-1">
                    Duration: {batch?.course?.duration} months | Fee: Rs {batch?.course?.fee}
                  </p>
                </div>
                <div className="pt-3">
                  <Link
                    to="/streamBatch"
                    className="primary-btn"
                    state={{ batchId: batch?.id }}
                  >
                    Open Batch
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="content-card empty-card">
              <h2 className="title-dark text-2xl">You have not enrolled in any batch yet</h2>
              <button onClick={() => navigate("/")} className="primary-btn mt-5">
                Go Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamStuentBatchs;
