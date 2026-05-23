import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FiPlus } from "react-icons/fi";

const StreamBatch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { batchId } = location.state || {};
  const { batchs } = useSelector((store) => store);
  const userRole = JSON.parse(localStorage.getItem("USER"))?.role;
  const allBatches = [...(batchs?.lecturerBatchs || []), ...(batchs?.myBatchs || [])];
  const currentBatch = allBatches.find((batch) => batch?.id === batchId);
  const classRooms = currentBatch?.classRooms || [];
  const batchName = currentBatch?.name || "Batch";

  return (
    <div className="page-shell">
      <div className="page-content space-y-6">
        <section className="surface-panel p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Tooltip title="Go Back" placement="right">
                <IconButton onClick={() => navigate(-1)} sx={{ backgroundColor: "white", boxShadow: 2 }}>
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Tooltip>
              <div>
                <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Batch Workspace</span>
                <h1 className="title-dark mt-3">{batchName}</h1>
              </div>
            </div>

            {userRole === "ROLE_LECTURER" && (
              <Link to="/createClassRoom" state={{ batchId }} className="primary-btn w-fit">
                <FiPlus /> Add ClassRoom
              </Link>
            )}
          </div>
        </section>

        <div className="grid-auto-fit">
          {classRooms.length > 0 ? (
            classRooms.map((room) => (
              <div key={room.id} className="dashboard-card p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{room.name}</h2>
                <p className="subtle-text">Open this room to access classes, teaching materials, and tests.</p>
                <Link to="/streamClassRoom" state={{ batchId, classRoomId: room?.id }} className="primary-btn w-fit">
                  View
                </Link>
              </div>
            ))
          ) : (
            <div className="empty-state col-span-full">
              <div className="content-card empty-card">
                <p className="subtle-text">No classrooms found for this batch.</p>
                <Link to="/" className="primary-btn mt-5">Back To Home</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamBatch;
