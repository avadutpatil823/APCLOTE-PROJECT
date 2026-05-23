import './App.css'
import Register from './Auth/Register'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './assets/ErrorBoundary'
import Login from './Auth/Login';
import NavBar from './Compoents/User/NavBar';
import Home from './Compoents/User/Home';
import Batch from './Compoents/Batch';
import AddSubjectForm from './Compoents/Admin/AddSubjectForm';
//import CreateCourseForm from './Compoents/Admin/CreateCourseForm';
import CreateBatchForm from './Compoents/Admin/CreateBatchFrom';
import CreateLecturerForm from './Compoents/Admin/CreateLectureForm';
import AssignBatchLecturerSubject from './Compoents/Admin/AssignBatchLecturerSubject ';
import CreateCourseForm2 from './Compoents/Admin/CourseForm';
import MyBatches from './Compoents/Student/MyBatchs';
import Dashboard from './Compoents/Student/Dashboard';
import AllBatches from './Compoents/User/AllBatchs';
import AllLecturersTable from './Compoents/Admin/AllLecturers';
import CreateOrder from './Compoents/User/CreateOrder';
import BatchDetails from './Compoents/User/BatchDetails';
import MyPurchaseOrders from './Compoents/Student/MyPurchaseOrdes';
import Payment from './Compoents/User/Payment';
import UploadVideo from './Compoents/Lecturer/UploadVideo';
import CreateTest from './Compoents/Lecturer/CreateTest';
import LectersBatchs from './Compoents/Lecturer/LectersBatchs';
import StreamBatch from './Compoents/Stream/StreamBatch';
import CreateClassRoom from './Compoents/Lecturer/CreateClassRoom';
import CreateClass from './Compoents/Lecturer/CreateClass';
import StreamMyBatchs from './Compoents/Stream/StreamMyBatchs';
import StreamClassRoom from './Compoents/Stream/StreamClassRoom';
import StreamClass from './Compoents/Stream/StreamClass';
import UploadNotes from './Compoents/Lecturer/UploadNotes';
import VideoPlayer from './Compoents/Stream/VideoPlayer';
import UserAnswers from './Compoents/Stream/UserAnswers';
import UserTestAns from './Compoents/Stream/UserTestAns';
import UTA from './Compoents/Stream/UTA';
import UpdateLecturer from './Compoents/Admin/UpdateLecturer';
import AllStudentsTable from './Compoents/Admin/AllStudents';
import ForgotPassword from './Compoents/User/ForgotPassword';
import VerifyOtp from './Compoents/User/VerifyOtp';
import ResetPassword from './Compoents/User/ResetPassword';
import APCLOTEFooter from './Compoents/User/APCLOTEFooter';
import AboutUs from './Compoents/User/AboutUs';
import APCLOTEPricing from './Compoents/User/APCLOTEPricing';
import APCLOTEContact from './Compoents/User/APCLOTEContact';
import APCLOTEBlog from './Compoents/User/APCLOTEBlog';
import OAuth2RedirectHandler from './Auth/OAuth2RedirectHandler';
import Terms from './Compoents/User/Terms';
import Privacy from './Compoents/User/Privacy';
import FounderDetails from './Compoents/User/Founder';
import PaymentPage from './Compoents/User/PaymentPage';
import ChatBot from './Compoents/AI/ChatBot';
import AIMentor from './Compoents/AI/AIMentor';
import Shorts from './Compoents/shorts/Shorts';


function AppRoutes() {
  const location = useLocation();
  const isShortsRoute = location.pathname === "/shorts";

  return (
    <>
      <ToastContainer toastClassName="toast-theme" />
      <NavBar/>
      <main className={isShortsRoute ? "app-main app-main--immersive" : "app-main"}>
      <Routes>
         <Route path='/' element={<ErrorBoundary> <Home/> </ErrorBoundary>}/>
        <Route path="/register" element={ <ErrorBoundary><Register/></ErrorBoundary>   }/>
        <Route path="/login" element={ <ErrorBoundary><Login/></ErrorBoundary>   }/>
        <Route path="/batch/:id" element={ <ErrorBoundary><Batch/></ErrorBoundary>   }/>
        <Route path='/oauth' element={<OAuth2RedirectHandler/>}/> 


        <Route path="/addSubject" element={ <ErrorBoundary><AddSubjectForm/></ErrorBoundary>   }/>
        <Route path="/createCourse" element={ <ErrorBoundary><CreateCourseForm2/></ErrorBoundary>   }/>
        <Route path="/createBatch" element={ <ErrorBoundary><CreateBatchForm/></ErrorBoundary>   }/>
        <Route path="/createLecturer" element={ <ErrorBoundary><CreateLecturerForm/></ErrorBoundary>   }/>
        <Route path="/assign" element={ <ErrorBoundary><AssignBatchLecturerSubject/></ErrorBoundary>   }/>
        <Route path="/myBatchs" element={ <ErrorBoundary><MyBatches/></ErrorBoundary>   }/>
        <Route path="/dashboard" element={ <ErrorBoundary><Dashboard/></ErrorBoundary>   }/>
        <Route path="/allBatchs" element={ <ErrorBoundary><AllBatches/></ErrorBoundary>   }/>
        <Route path="/allLecturers" element={ <ErrorBoundary><AllLecturersTable/></ErrorBoundary>   }/>
        <Route path="/createOrder" element={ <ErrorBoundary><CreateOrder/></ErrorBoundary>   }/>
        <Route path="/myPOs" element={ <ErrorBoundary><MyPurchaseOrders/></ErrorBoundary>   }/>
        <Route path="/pay" element={ <ErrorBoundary><Payment/></ErrorBoundary>   }/>

         <Route path="/dopay" element={ <ErrorBoundary><PaymentPage/></ErrorBoundary>   }/>

         <Route path="/uploadVideo" element={ <ErrorBoundary><UploadVideo/></ErrorBoundary>   }/>
          <Route path="/uploadNotes" element={ <ErrorBoundary><UploadNotes/></ErrorBoundary>   }/>
       <Route path="/createTest" element={ <ErrorBoundary><CreateTest/></ErrorBoundary>   }/>
        <Route path="/lecturerBatchs" element={ <ErrorBoundary><LectersBatchs/></ErrorBoundary>   }/>
       <Route path="/streamBatch" element={ <ErrorBoundary><StreamBatch/></ErrorBoundary>   }/>
       <Route path="/streamMyBatchs" element={ <ErrorBoundary><StreamMyBatchs/></ErrorBoundary>   }/>
      < Route path="/streamClassRoom" element={ <ErrorBoundary><StreamClassRoom/></ErrorBoundary>   }/>
       < Route path="/streamClass" element={ <ErrorBoundary><StreamClass/></ErrorBoundary>   }/>
       < Route path="/videoPlayer" element={ <ErrorBoundary><VideoPlayer/></ErrorBoundary>   }/>
       < Route path="/userAnswers" element={ <ErrorBoundary><UserAnswers/></ErrorBoundary>   }/>
       < Route path="/userTestAns" element={ <ErrorBoundary><UserTestAns/></ErrorBoundary>   }/>
       < Route path="/UTA" element={ <ErrorBoundary><UTA/></ErrorBoundary>   }/>
       < Route path="/updateLecturer" element={ <ErrorBoundary><UpdateLecturer/></ErrorBoundary>   }/>
      < Route path="/allStudents" element={ <ErrorBoundary><AllStudentsTable/></ErrorBoundary>   }/>
      < Route path="/batchDetails" element={ <ErrorBoundary><BatchDetails/></ErrorBoundary>   }/>

      < Route path="/chat" element={ <ErrorBoundary><ChatBot/></ErrorBoundary>   }/>
      < Route path="/mentor" element={ <ErrorBoundary><AIMentor/></ErrorBoundary>   }/>
      < Route path="/shorts" element={ <ErrorBoundary><Shorts/></ErrorBoundary>   }/>
      < Route path="/shorts" element={ <ErrorBoundary><Shorts/></ErrorBoundary>   }/>
       
     
       <Route path="/createClassRoom" element={ <ErrorBoundary><CreateClassRoom/></ErrorBoundary>   }/>
       <Route path="/createClass" element={ <ErrorBoundary><CreateClass/></ErrorBoundary>   }/>
      
       <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/about" element={<AboutUs />} />
      <Route path="/pricing" element={<APCLOTEPricing />} />
      <Route path="/contact" element={<APCLOTEContact />} />
       <Route path="/blog" element={<APCLOTEBlog />} />

      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/founders" element={<FounderDetails />} />

      



      </Routes>
      </main>
      {!isShortsRoute && <APCLOTEFooter/>}
    </>
  )
}

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
