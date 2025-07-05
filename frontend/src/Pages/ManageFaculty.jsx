import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import CreateFaculty from "../components/CreateFaculty";
import { axiosInstance } from "../lib/axiosInstance"; // Adjust the path as needed
import toast from "react-hot-toast";

const ManageFaculty = () => {
  const { faculties, getAllData, sideBarOpen, isLoading } = useAuthStore();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllData(); // Fetch faculty, students, departments from backend
  }, [getAllData]);

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/delete-faculty/${id}`);
      if (res.status === 200) {
        toast.success("Faculty deleted successfully");
        getAllData();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete faculty");
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div
      className={`p-6 ${
        sideBarOpen ? "ml-58" : "ml-20"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-base-content">Manage Faculty</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-focus transition"
        >
          Add Faculty
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-base-300 shadow bg-base-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-base-200 text-base-content font-semibold">
            <tr>
              <th className="px-4 py-3 border border-base-300">Name</th>
              <th className="px-4 py-3 border border-base-300">Department</th>
              <th className="px-4 py-3 border border-base-300">Email</th>
              <th className="px-2 py-3 border border-base-300 w-[100px] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-base-content">
                  Loading...
                </td>
              </tr>
            ) : faculties?.length > 0 ? (
              faculties.map((fac) => (
                <tr key={fac._id || fac.id} className="hover:bg-base-200">
                  <td className="px-4 py-2 border border-base-300">
                    {fac.name}
                  </td>
                  <td className="px-4 py-2 border border-base-300">
                    {fac.department}
                  </td>
                  <td className="px-4 py-2 border border-base-300">
                    {fac.email}
                  </td>
                  <td className="px-2 py-2 border border-base-300 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(fac._id || fac.id)}
                      className="bg-error text-white px-3 py-1 rounded hover:bg-error-content transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-base-content">
                  No faculty found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg border border-base-300 shadow-xl p-6 w-full max-w-lg">
            <CreateFaculty
              onSuccess={() => {
                setShowModal(false);
                getAllData();
                toast.success("Faculty added successfully");
              }}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFaculty;
