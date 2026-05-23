import React from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const StreamClassRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { batchId, classRoomId } = location.state || {};
  const { batchs } = useSelector((store) => store);
  const userRole = JSON.parse(localStorage.getItem("USER"))?.role;
  const allBatches = [...(batchs?.lecturerBatchs || []), ...(batchs?.myBatchs || [])];
  const currentBatch = allBatches.find((batch) => batch?.id === batchId);
  const classRoom = currentBatch?.classRooms?.find((room) => room?.id === classRoomId);

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
                <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Class Room</span>
                <h1 className="title-dark mt-3">{classRoom?.name}</h1>
              </div>
            </div>

            {userRole === "ROLE_LECTURER" && (
              <Link to="/createClass" state={{ batchId, classRoomId, classRoom }} className="primary-btn w-fit">
                <FiPlus /> Add New Class
              </Link>
            )}
          </div>
        </section>

        <div className="space-y-4">
          {classRoom?.classes && classRoom.classes.length > 0 ? (
            classRoom.classes.map((cls) => (
              <div key={cls.id} className="content-card p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <span className="font-semibold text-lg">{cls.className}</span>
                <Link
                  to="/streamClass"
                  state={{ batchId, classRoomId, classId: cls?.id }}
                  className="primary-btn w-fit"
                >
                  View
                </Link>
              </div>
            ))
          ) : (
            <div className="content-card p-8 text-center subtle-text">No classes available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamClassRoom;
