import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Store/store";
import { getLecturers, getSearchedLecturers } from "../../State/LecturerAndUsers/Action";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "../User/Pagination";
import { askYesNo } from "../User/YesNoModal";

const AllLecturersTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lecturesAndUsers } = useSelector(store => store);
  const [searchKey, setSearchKey] = useState("");

  const page = lecturesAndUsers.page;
  const totalPages = lecturesAndUsers.totalPages;

  useEffect(() => {
    dispatch(getLecturers(page));
  }, [dispatch]);

 const onPageChane=(num)=>{
   dispatch(getLecturers(num))
  }

  useEffect(() => {
       if (searchKey.trim().length > 0) {
      dispatch(getSearchedLecturers(searchKey, 1));
    } else {
      dispatch(getLecturers(page)); // reset to all
    }
  }, [searchKey,setSearchKey])

  const deleteLecturer = async (lecturerId) => {
    try {
          const answer= await askYesNo("Are Sure? Want To delete Lecturer")
         
          if(answer){
                 const token = JSON.parse(localStorage.getItem("JWT"));
      const response = await axios.get(
        `http://localhost:9898/admin/deleteLecturer?lecturerId=${lecturerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data);
      dispatch(getLecturers(0));
      navigate("/allLecturers");
          }
         }
          catch(error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Deletion failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Lecturers</h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search lecturer by name, email, etc..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="border p-2 w-1/3 rounded-l-md focus:outline-none"
        />
        
      </div>

      {lecturesAndUsers?.lecturers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Salary</th>
                <th className="py-2 px-4 text-left">Date of Joining</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {lecturesAndUsers?.lecturers.map((lec) => (
                <tr key={lec.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4">{lec.id}</td>
                  <td className="py-2 px-4">{lec.user?.name}</td>
                  <td className="py-2 px-4">₹{lec.salary}</td>
                  <td className="py-2 px-4">{lec.dateOfJoining}</td>
                  <td className="py-2 px-4">{lec.user?.phono}</td>
                  <td className="py-2 px-4">{lec.user?.address}</td>
                  <td className="py-2 px-4">{lec.user?.email}</td>
                  <td className="py-2 px-4 flex justify-evenly">
                    <Link
                      className="py-3 px-5 bg-green-400 rounded-lg text-white hover:bg-green-600"
                      to={"/updateLecturer"}
                      state={{ lecturer: lec }}
                    >
                      Update
                    </Link>
                    <button
                      className="py-3 px-5 bg-red-400 rounded-lg text-white hover:bg-red-600"
                      onClick={() => deleteLecturer(lec.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No lecturers found.</p>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChane}/>
    </div>
  );
};

export default AllLecturersTable;
