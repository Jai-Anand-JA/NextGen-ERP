import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { axiosInstance } from '../lib/axiosInstance';
import { Calendar, Users } from 'lucide-react';

const ManageSubjects = () => {
  const { departments, faculties, getAllData, sideBarOpen, subjects } = useAuthStore();

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [facultySelection, setFacultySelection] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const openModal = (subject) => {
    setSelectedSubject(subject);
    setFacultySelection(subject.faculty.map(f => f._id));
    setShowModal(true);
  };

  const handleFacultySelect = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    setFacultySelection((prev) =>
      checked ? [...prev, id] : prev.filter(fid => fid !== id)
    );
  };

  const handleUpdateFaculty = async () => {
    try {
      await axiosInstance.put(`/api/admin/update-subject-faculty/${selectedSubject._id}`, {
        faculty: facultySelection
      });
      setShowModal(false);
      setSelectedSubject(null);
      setFacultySelection([]);
      await getAllData(); // Refresh data
    } catch (error) {
      console.error('Error updating faculty:', error);
    }
  };

  return (
    <div className={`p-6 bg-base-200 min-h-screen transition-all duration-300 ${sideBarOpen ? 'ml-36' : 'ml-18'}`}>
      <h1 className="text-2xl font-bold mb-6 text-base-content">Manage Subjects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col gap-2 justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {subject.name} ({subject.code})
              </h3>
              <p className="text-sm text-gray-300">Department: {subject.department}</p>
              <p className="text-sm text-gray-300">Credits: {subject.credits}</p>
              <div className="flex items-center text-sm text-gray-400 gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Year: {subject.year}
                </span>
                <span className="flex items-center gap-1">
                  Sem: {subject.semester}
                </span>
              </div>
              <p className="text-sm mt-2 text-gray-200">
                Teachers: <span className="font-semibold">{subject.faculty.map(f => f.name).join(', ') || 'None'}</span>
              </p>
            </div>
            <button
              onClick={() => openModal(subject)}
              className="mt-3 self-end px-4 py-2 bg-primary text-white rounded hover:bg-primary-focus flex items-center gap-1"
            >
              <Users className="w-4 h-4" /> Update Teachers
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-xl border border-base-300">
            <h2 className="text-xl font-bold mb-4">Update Teachers for {selectedSubject.name}</h2>

            <div className="mb-4 max-h-52 overflow-y-auto">
              {faculties?.map((fac) => (
                <label key={fac._id} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    value={fac._id}
                    checked={facultySelection.includes(fac._id)}
                    onChange={handleFacultySelect}
                  />
                  <span>{fac.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="btn btn-ghost">Cancel</button>
              <button onClick={handleUpdateFaculty} className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;
