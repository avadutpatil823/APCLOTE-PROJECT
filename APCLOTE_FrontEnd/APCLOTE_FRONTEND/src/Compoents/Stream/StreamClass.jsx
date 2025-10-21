import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PlusIconWithTooltip from "../User/PlusIconWithTooltip";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserTestAns } from "../../State/LecturerAndUsers/Action";
import store from "../../Store/store";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UTA from "./UTA";



const StreamClass = () => {

  const location = useLocation();
  const { classData } = location.state; // The class object passed via location.state
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("videos"); // Initially show videos
  const [testIds, setTestIds] = useState([])
  const [submitedIds, setSubmitedIds] = useState([])

  const [filteredTests, setFilteredTests] = useState([]);
  const { lecturesAndUsers } = useSelector(store => store)
  const userAllTA = lecturesAndUsers?.userAllTA

  useEffect(() => {

    dispatch(getAllUserTestAns());

    if (classData?.tests?.length > 0) {
      const ids = classData.tests.map((test) => test.id);
      setTestIds(ids);
    }
  }, [dispatch, classData]);


  useEffect(() => {
    if (userAllTA && testIds.length > 0) {
      const filtered = userAllTA.filter((uta) => testIds.includes(uta.test.id));
      setFilteredTests(filtered);
      const submitedIds = filtered.map((filt) => filt.test.id)
      setSubmitedIds(submitedIds)

    } else {
      setFilteredTests([]);
    }
  }, [userAllTA, testIds]);


  const addTestId = () => {
    if (!classData?.tests) return;
    const ids = classData.tests.map((test) => test.id);
    setTestIds(ids);
    // getClassUserTestAns()   
  }


  const navigate = useNavigate()
  const handleBack = () => navigate(-1);



  return (
    <div className={`p-6 max-w-4xl mx-auto min-h-screen`}>

      {/* Class Name */}
      <Tooltip title="Go Back" placement="right">
        <IconButton
          onClick={handleBack}
          sx={{
            // position: 'fixed',
            // top: 50,
            // left: 20,
            // zIndex: 3000,
            height: "2rem",
            width: "2rem",
            backgroundColor: 'white',
            color: 'primary.main',
            boxShadow: 3,
            '&:hover': { backgroundColor: 'primary.light', color: 'white' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Tooltip>
      <h1 className="text-3xl font-bold mx-auto my-3">ClassName - {classData.className}</h1>


      {/* Tabs */}
      <div className="flex  gap-6 mb-6 ">
        {["videos", "notes", "tests"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 justify-between items-center flex rounded-md font-semibold ${activeTab === tab
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {JSON.parse(localStorage.getItem("USER")).role == "ROLE_LECTURER" && (
              <Link to={activeTab === "videos" ? "/uploadVideo" : activeTab === "notes" ? "/uploadNotes" : "/createTest"} state={{ classId: classData.id }}>
                <PlusIconWithTooltip color={activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} />
              </Link>
            )}

          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === "videos" &&
          (classData?.videos?.length > 0 ? (
            classData.videos.map((video, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow flex flex-col justify-between"
              >
                <div className="w-[full] h-[20vh] bg-gray-500">
                </div>
                <h2 className="font-semibold mb-2">{video.title}</h2>
                <Link
                  to={"/videoPlayer"}
                  state={{ video }}
                  className="mt-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
                >
                  Stream
                </Link>
              </div>
            ))
          ) : (
            <p>No videos available.</p>
          ))}

        {activeTab === "notes" &&
          (classData?.notes?.length > 0 ? (
            classData.notes.map((note, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow flex flex-col justify-between"
              >
                <div className="w-[full] h-[20vh] ">
                  <img src="/notes.png" alt="" className="w-full h-full" />
                </div>
                <h2 className="font-semibold mb-2">{note.title}</h2>


                <a href={`http://localhost:9898/api/view?filePath=${encodeURIComponent(note.filePath.replace(/\\/g, "/"))}`}
                  className="py-3 px-5 bg-green-400 text-white rounded hover:bg-green-600 mt-3"
                >
                  View
                </a>
              </div>
            ))
          ) : (
            <p>No notes available.</p>
          ))}

        {activeTab === "tests" && (
          <div id="main" className="w-[56vw]  grid grid-cols-3 gap-5" >

           

             
                {classData?.tests?.length > 0 ? (
                  classData.tests.map((test, index) => {
                     
                    const userTA=filteredTests?.length > 0 &&filteredTests.find((uta) =>  uta.test.id === test.id )
                    
                      

                    return (
                      <div
                        key={index}
                       className="p-4 border rounded shadow flex flex-col justify-between"
                      >
                        <div className="w-full h-[20vh]">
                          <img src="/test.png" alt="test" className="w-full h-full" />
                        </div>

                        <h2 className="font-semibold mb-2">{test.name}</h2>

                        {userTA ? (

                               <Link
                        to="/UTA"
                        state={{ userTA }}
                        className="mt-auto px-3 py-1 bg-green-400 text-white rounded hover:bg-green-600 text-center"
                      >
                        See Result
                      </Link>
                          ):(
                              <Link
                                to="/userAnswers"
                                state={{ test }}
                                className="mt-auto px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-center"
                              >
                                Attempt
                              </Link>
                            )
                       }

                        {/* <Link
                          to="/userAnswers"
                          state={{ test }}
                          className="mt-auto px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-center"
                        >
                          Attempt
                        </Link> */}

                      </div>
                    );
                  })
                ) : (
                  <p>No tests available.</p>
                )}
              </div>
           

          
        )}

      </div>
    </div>
  );
};

export default StreamClass;
