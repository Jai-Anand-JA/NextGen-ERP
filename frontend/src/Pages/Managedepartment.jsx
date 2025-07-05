import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
const ManageDepartments = () => {
  const [departments, setDepartments] = useState([
    { code: 'CSE', name: 'Computer Science Engineering', hod: 'Dr. A. Verma', studentCount: 120, facultyCount: 15 },
    { code: 'ECE', name: 'Electronics and Communication', hod: 'Prof. B. Singh', studentCount: 80, facultyCount: 10 },
    { code: 'ME', name: 'Mechanical Engineering', hod: 'Dr. C. Sharma', studentCount: 60, facultyCount: 8 },
  ]);

  const [newDepartment, setNewDepartment] = useState({
    code: '',
    name: '',
    hod: '',
    studentCount: '',
    facultyCount: ''
  });
  const [showModal, setShowModal] = useState(false);
  const { sideBarOpen } = useAuthStore();
  const handleAddDepartment = () => {
    if (!newDepartment.code || !newDepartment.name || !newDepartment.hod) return;
    setDepartments([
      ...departments,
      {
        ...newDepartment,
        studentCount: parseInt(newDepartment.studentCount || 0),
        facultyCount: parseInt(newDepartment.facultyCount || 0),
      }
    ]);
    setNewDepartment({ code: '', name: '', hod: '', studentCount: '', facultyCount: '' });
    setShowModal(false);
  };

  return (
    <div className={`p-6 bg-base-200 min-h-screen text-base-content transition-all duration-300 ${sideBarOpen ? 'ml-36' : 'ml-18'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-base-content">Manage Departments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-focus transition"
        >
           Add Department
        </button>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto rounded-lg border border-base-300 shadow bg-base-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-base-200 text-base-content font-semibold">
            <tr>
              <th className="px-4 py-3 border border-base-300 w-[90px]">Code</th>
              <th className="px-4 py-3 border border-base-300">Department Name</th>
              <th className="px-4 py-3 border border-base-300">H.O.D</th>
              <th className="px-4 py-3 border border-base-300 text-center w-[120px]"># Students</th>
              <th className="px-4 py-3 border border-base-300 text-center w-[120px]"># Faculties</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, idx) => (
              <tr key={idx} className="hover:bg-base-200">
                <td className="px-4 py-2 border border-base-300 font-semibold">{dept.code}</td>
                <td className="px-4 py-2 border border-base-300">{dept.name}</td>
                <td className="px-4 py-2 border border-base-300">{dept.hod}</td>
                <td className="px-4 py-2 border border-base-300 text-center">{dept.studentCount}</td>
                <td className="px-4 py-2 border border-base-300 text-center">{dept.facultyCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
              required
            />
            <input
              type="text"
              placeholder="Department Name"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newDepartment.name}
              onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Head of Department (H.O.D)"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newDepartment.hod}
              onChange={(e) => setNewDepartment({ ...newDepartment, hod: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="No. of Students (optional)"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newDepartment.studentCount}
              onChange={(e) => setNewDepartment({ ...newDepartment, studentCount: e.target.value })}
              min={0}
            />
            <input
              type="number"
              placeholder="No. of Faculties (optional)"
              className="w-full p-2 border border-base-300 rounded mb-4 bg-base-200 text-base-content"
              value={newDepartment.facultyCount}
              onChange={(e) => setNewDepartment({ ...newDepartment, facultyCount: e.target.value })}
              min={0}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-base-200 border border-base-300 rounded hover:bg-base-300 text-base-content"
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
