import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLecturers, getSearchedLecturers } from "../../State/LecturerAndUsers/Action";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "../User/Pagination";
import { askYesNo } from "../User/YesNoModal";
import { buildUrl } from "../../config/api";

const AllLecturersTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lecturesAndUsers } = useSelector((store) => store);
  const [searchKey, setSearchKey] = useState("");

  const page = lecturesAndUsers.page;
  const totalPages = lecturesAndUsers.totalPages;

  useEffect(() => {
    dispatch(getLecturers(page));
  }, [dispatch]);

  const onPageChane = (num) => {
    dispatch(getLecturers(num));
  };

  useEffect(() => {
    if (searchKey.trim().length > 0) {
      dispatch(getSearchedLecturers(searchKey, 1));
    } else {
      dispatch(getLecturers(page));
    }
  }, [searchKey]);

  const deleteLecturer = async (lecturerId) => {
    try {
      const answer = await askYesNo("Are Sure? Want To delete Lecturer");
      if (answer) {
        const token = JSON.parse(localStorage.getItem("JWT"));
        const response = await axios.get(
          buildUrl(`/admin/deleteLecturer?lecturerId=${lecturerId}`),
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
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Deletion failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="page-content space-y-6">
        <section className="surface-panel p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Lecturers</span>
              <h1 className="title-dark mt-4">All Lecturers</h1>
            </div>
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="field-input"
              />
            </div>
          </div>
        </section>

        {lecturesAndUsers?.lecturers.length > 0 ? (
          <div className="table-shell overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Salary</th>
                  <th>Date of Joining</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lecturesAndUsers?.lecturers.map((lec) => (
                  <tr key={lec.id}>
                    <td>{lec.id}</td>
                    <td>{lec.user?.name}</td>
                    <td>Rs {lec.salary}</td>
                    <td>{lec.dateOfJoining}</td>
                    <td>{lec.user?.phono}</td>
                    <td>{lec.user?.address}</td>
                    <td>{lec.user?.email}</td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <Link className="primary-btn !py-2 !px-4" to="/updateLecturer" state={{ lecturer: lec }}>
                          Update
                        </Link>
                        <button className="danger-btn !py-2 !px-4" onClick={() => deleteLecturer(lec.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="content-card empty-card">
              <p className="subtle-text text-lg">No lecturers found.</p>
            </div>
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChane} />
      </div>
    </div>
  );
};

export default AllLecturersTable;
