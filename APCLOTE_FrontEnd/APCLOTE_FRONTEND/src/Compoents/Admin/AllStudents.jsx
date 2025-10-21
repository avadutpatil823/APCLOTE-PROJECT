import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Store/store";
import { getAllStudents, getLecturers, getSearchedLecturers, getSearchedStudents } from "../../State/LecturerAndUsers/Action";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "../User/Pagination";
import { askYesNo } from "../User/YesNoModal";

const AllStudentsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lecturesAndUsers } = useSelector(store => store);
  const [searchKey, setSearchKey] = useState("");

  const page = lecturesAndUsers.page;
  const totalPages = lecturesAndUsers.totalPages;

  useEffect(() => {
    dispatch(getAllStudents(page));
  }, [dispatch]);

 const onPageChane=(num)=>{
   dispatch(getAllStudents(num))
  }

  useEffect(() => {
       if (searchKey.trim().length > 0) {
      dispatch(getSearchedStudents(searchKey, 1));
    } else {
      dispatch(getAllStudents(page)); // reset to all
    }
  }, [searchKey,setSearchKey])

  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Students</h1>

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

      {lecturesAndUsers?.students.length > 0 ? (
        <div className="overflow-x-auto">
         <table className="min-w-full bg-white border border-gray-200 rounded-lg">
  <thead>
    <tr className="bg-blue-500 text-white">
      <th className="py-2 px-4 text-left">ID</th>
      <th className="py-2 px-4 text-left">Name</th>
      <th className="py-2 px-4 text-left">Phone</th>
      <th className="py-2 px-4 text-left">Address</th>
      <th className="py-2 px-4 text-left">Email</th>
      <th className="py-2 px-4 text-left">Batch</th>
      <th className="py-2 px-4 text-left">Validity</th>
    </tr>
  </thead>

  <tbody>
    {lecturesAndUsers?.students.map((std) => (
      <tr key={std.id} className="border-t border-gray-200 hover:bg-gray-50 align-top">
        <td className="py-2 px-4">{std.id}</td>
        <td className="py-2 px-4">{std.user?.name}</td>
        <td className="py-2 px-4">{std.user?.phono}</td>
        <td className="py-2 px-4">{std.user?.address}</td>
        <td className="py-2 px-4">{std.user?.email}</td>

        {/* Combine multiple batches and validities in one cell each */}
        <td className="py-2 px-4  ">
          {std.batchValidyDate?.map((bv, i) => (
            <div key={i} className="mb-1 p-1 bg-gray-200">{bv.batchName}</div>
          ))}
        </td>

        <td className="py-2 px-4">
          {std.batchValidyDate?.map((bv, i) => (
            <div key={i} className="mb-1 p-1 bg-gray-200">{bv.validityDate}</div>
          ))}
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No Students found.</p>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChane}/>
    </div>
  );
};

export default AllStudentsTable;
