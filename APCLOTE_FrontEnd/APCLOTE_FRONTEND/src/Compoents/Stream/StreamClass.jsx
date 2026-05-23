import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PlusIconWithTooltip from "../User/PlusIconWithTooltip";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserTestAns } from "../../State/LecturerAndUsers/Action";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { buildApiUrl } from "../../config/api";

const StreamClass = () => {
  const location = useLocation();
  const { batchId, classRoomId, classId } = location.state || {};
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("videos");
  const [testIds, setTestIds] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const { lecturesAndUsers, batchs } = useSelector((store) => store);
  const userAllTA = lecturesAndUsers?.userAllTA;
  const userRole = JSON.parse(localStorage.getItem("USER"))?.role;
  const allBatches = [...(batchs?.lecturerBatchs || []), ...(batchs?.myBatchs || [])];
  const currentBatch = allBatches.find((batch) => batch?.id === batchId);
  const currentClassRoom = currentBatch?.classRooms?.find((room) => room?.id === classRoomId);
  const classData = currentClassRoom?.classes?.find((cls) => cls?.id === classId);

  useEffect(() => {
    dispatch(getAllUserTestAns());
    if (classData?.tests?.length > 0) {
      setTestIds(classData.tests.map((test) => test.id));
    }
  }, [dispatch, classData]);

  useEffect(() => {
    if (userAllTA && testIds.length > 0) {
      setFilteredTests(userAllTA.filter((uta) => testIds.includes(uta.test.id)));
    } else {
      setFilteredTests([]);
    }
  }, [userAllTA, testIds]);

  const navigate = useNavigate();
  const tabs = ["videos", "notes", "tests"];

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
                <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Class Space</span>
                <h1 className="title-dark mt-3">{classData?.className}</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "primary-btn" : "ghost-btn"}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {userRole === "ROLE_LECTURER" && (
                  <Link
                    to={tab === "videos" ? "/uploadVideo" : tab === "notes" ? "/uploadNotes" : "/createTest"}
                    state={{ batchId, classRoomId, classId: classData?.id }}
                  >
                    <PlusIconWithTooltip color={activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} />
                  </Link>
                )}
              </button>
            ))}
          </div>
        </section>

        {activeTab === "videos" && (
          <div className="grid-auto-fit">
            {classData?.videos?.length > 0 ? (
              classData.videos.map((video, index) => (
                <div key={index} className="dashboard-card p-5 space-y-4">
                  <div className="h-[20vh] rounded-2xl bg-[linear-gradient(135deg,#4f46e5,#06b6d4)]"></div>
                  <h2 className="font-semibold text-lg">{video.title}</h2>
                  <Link to="/videoPlayer" state={{ video }} className="primary-btn w-fit">
                    Stream
                  </Link>
                </div>
              ))
            ) : (
              <div className="content-card p-8 text-center subtle-text">No videos available.</div>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="grid-auto-fit">
            {classData?.notes?.length > 0 ? (
              classData.notes.map((note, index) => (
                <div key={index} className="dashboard-card p-5 space-y-4">
                  <div className="h-[20vh] rounded-2xl bg-stone-100 p-4">
                    <img src="/notes.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <h2 className="font-semibold text-lg">{note.title}</h2>
                  <a
                    href={buildApiUrl(`/view?filePath=${encodeURIComponent(note.filePath.replace(/\\/g, "/"))}`)}
                    className="primary-btn w-fit"
                  >
                    View
                  </a>
                </div>
              ))
            ) : (
              <div className="content-card p-8 text-center subtle-text">No notes available.</div>
            )}
          </div>
        )}

        {activeTab === "tests" && (
          <div className="grid-auto-fit">
            {classData?.tests?.length > 0 ? (
              classData.tests.map((test, index) => {
                const userTA = filteredTests?.length > 0 && filteredTests.find((uta) => uta.test.id === test.id);

                return (
                  <div key={index} className="dashboard-card p-5 space-y-4">
                    <div className="h-[20vh] rounded-2xl bg-stone-100 p-4">
                      <img src="/test.png" alt="test" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="font-semibold text-lg">{test.name}</h2>
                    {userTA ? (
                      <Link to="/UTA" state={{ userTA }} className="secondary-btn w-fit">
                        See Result
                      </Link>
                    ) : (
                      <Link to="/userAnswers" state={{ test }} className="primary-btn w-fit">
                        Attempt
                      </Link>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="content-card p-8 text-center subtle-text">No tests available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamClass;
