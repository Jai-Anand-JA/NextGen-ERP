import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { axiosInstance } from '../lib/axiosInstance';

const ManageDepartments = () => {
  const {
    departments,
    faculties,
    getAllData,
    isLoading,
    sideBarOpen,
  } = useAuthStore();

  const [newDepartment, setNewDepartment] = useState({
    code: '',
    name: '',
    headOfDepartment: '',
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddDepartment = async () => {
    const { code, name, headOfDepartment } = newDepartment;

    if (!code || !name || !headOfDepartment) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await axiosInstance.post('/api/admin/create-department', newDepartment);
      toast.success('Department added successfully');
      setNewDepartment({ code: '', name: '', headOfDepartment: '' });
      setShowModal(false);
      getAllData();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Error creating department');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/admin/delete-department/${id}`);
      toast.success('Department deleted successfully');
      getAllData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error deleting department');
    }
  };

  return (
    <div className={`p-6 bg-base-200 min-h-screen text-base-content transition-all duration-300 ${sideBarOpen ? 'ml-36' : 'ml-18'}`}>
      <Toaster />

      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-base-content">Manage Departments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-focus transition"
        >
          Add Department
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-base-content/60 py-10">Loading departments...</div>
      ) : (
        <div className="max-w-6xl mx-auto overflow-x-auto rounded-lg border border-base-300 shadow bg-base-100">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-base-200 text-base-content font-semibold">
              <tr>
                <th className="px-4 py-3 border border-base-300 w-[90px]">Code</th>
                <th className="px-4 py-3 border border-base-300">Department Name</th>
                <th className="px-4 py-3 border border-base-300">H.O.D</th>
                <th className="px-4 py-3 border border-base-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(departments || []).map((dept) => (
                <tr key={dept._id} className="hover:bg-base-200">
                  <td className="px-4 py-2 border border-base-300 font-semibold">{dept.code}</td>
                  <td className="px-4 py-2 border border-base-300">{dept.name}</td>
                  <td className="px-4 py-2 border border-base-300">{dept.headOfDepartment}</td>
                  <td className="px-4 py-2 border border-base-300 text-center">
                    <button
                      onClick={() => handleDelete(dept._id)}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {departments?.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-base-content/50">No departments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* === Modal === */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-xl border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">Add New Department</h2>

            <input
              type="text"
              placeholder="Code (e.g., CSE)"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newDepartment.code}
              onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value.toUpperCase() })}
            />

            <input
              type="text"
              placeholder="Department Name"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
            />

            <select
              className="w-full p-2 border border-base-300 rounded mb-4 bg-base-200 text-base-content"
              value={newDepartment.headOfDepartment}
              onChange={(e) => setNewDepartment({ ...newDepartment, headOfDepartment: e.target.value })}
            >
              <option value="">Select Head of Department</option>
              {(faculties || []).map((faculty) => (
                <option key={faculty._id} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-base-200 border border-base-300 rounded hover:bg-base-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDepartment}
                className="px-4 py-2 bg-success text-white rounded hover:bg-success-content"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDepartments;
