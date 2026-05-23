import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents, getSearchedStudents } from "../../State/LecturerAndUsers/Action";
import Pagination from "../User/Pagination";

const AllStudentsTable = () => {
  const dispatch = useDispatch();
  const { lecturesAndUsers } = useSelector((store) => store);
  const [searchKey, setSearchKey] = useState("");

  const page = lecturesAndUsers.page;
  const totalPages = lecturesAndUsers.totalPages;

  useEffect(() => {
    dispatch(getAllStudents(page));
  }, [dispatch]);

  const onPageChane = (num) => {
    dispatch(getAllStudents(num));
  };

  useEffect(() => {
    if (searchKey.trim().length > 0) {
      dispatch(getSearchedStudents(searchKey, 1));
    } else {
      dispatch(getAllStudents(page));
    }
  }, [searchKey]);

  return (
    <div className="page-shell">
      <div className="page-content space-y-6">
        <section className="surface-panel p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="eyebrow !bg-[#fff1dc] !text-[#a85c00] !border-[#f7d7a6]">Students</span>
              <h1 className="title-dark mt-4">All Students</h1>
            </div>
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Search student by name or email..."
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="field-input"
              />
            </div>
          </div>
        </section>

        {lecturesAndUsers?.students.length > 0 ? (
          <div className="table-shell overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Batch</th>
                  <th>Validity</th>
                </tr>
              </thead>
              <tbody>
                {lecturesAndUsers?.students.map((std) => (
                  <tr key={std.id}>
                    <td>{std.id}</td>
                    <td>{std.user?.name}</td>
                    <td>{std.user?.phono}</td>
                    <td>{std.user?.address}</td>
                    <td>{std.user?.email}</td>
                    <td>
                      <div className="flex flex-col gap-2">
                        {std.batchValidyDate?.map((bv, i) => (
                          <div key={i} className="pill-tag !w-fit">
                            {bv.batchName}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-2">
                        {std.batchValidyDate?.map((bv, i) => (
                          <div key={i} className="rounded-xl bg-stone-100 px-3 py-2 border border-stone-200">
                            {bv.validityDate}
                          </div>
                        ))}
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
              <p className="subtle-text text-lg">No students found.</p>
            </div>
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChane} />
      </div>
    </div>
  );
};

export default AllStudentsTable;
