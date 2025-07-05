import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
const ManageFaculty = () => {
  const [faculties, setFaculties] = useState([
    { id: 1, name: 'Pooja Gupta', department: 'CSE', email: 'pooja@example.com' },
    { id: 2, name: 'Ravi Sharma', department: 'ECE', email: 'ravi@example.com' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: '', department: '', email: '' });

  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.department || !newFaculty.email) return;
    setFaculties([...faculties, { id: Date.now(), ...newFaculty }]);
    setNewFaculty({ name: '', department: '', email: '' });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setFaculties(faculties.filter(fac => fac.id !== id));
  };

  const {sideBarOpen, setSidebarOpen} = useAuthStore();

  return (
    <div className={`p-6 ${sideBarOpen ? 'ml-58' : 'ml-20'}`}>
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
              <th className="px-2 py-3 border border-base-300 w-[100px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map(fac => (
              <tr key={fac.id} className="hover:bg-base-200">
                <td className="px-4 py-2 border border-base-300">{fac.name}</td>
                <td className="px-4 py-2 border border-base-300">{fac.department}</td>
                <td className="px-4 py-2 border border-base-300">{fac.email}</td>
                <td className="px-2 py-2 border border-base-300 w-[100px] text-center whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(fac.id)}
                    className="bg-error text-white px-3 py-1 rounded hover:bg-error-content transition text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-xl border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">Add New Faculty</h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newFaculty.name}
              onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newFaculty.department}
              onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-base-300 rounded mb-4 bg-base-200 text-base-content"
              value={newFaculty.email}
              onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-base-200 border border-base-300 rounded hover:bg-base-300 text-base-content"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFaculty}
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

export default ManageFaculty;
