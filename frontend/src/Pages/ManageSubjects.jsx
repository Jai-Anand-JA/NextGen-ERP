import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
const ManageSubjects = () => {
  const [departments] = useState(['CSE', 'ECE', 'ME']);
  const [faculties] = useState(['Dr. A. Verma', 'Prof. B. Singh', 'Dr. C. Sharma', 'Dr. D. Mehta']);

  const [courses, setCourses] = useState([
    { code: 'CSF307', name: 'Technical Training 2', department: 'CSE', faculty: 'Dr. A. Verma' },
    { code: 'EC301', name: 'Digital Systems', department: 'ECE', faculty: 'Prof. B. Singh' },
    { code: 'ME205', name: 'Thermodynamics', department: 'ME', faculty: 'Dr. C. Sharma' },
  ]);

  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    department: '',
    faculty: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleFacultyChange = (index, newFaculty) => {
    const updated = [...courses];
    updated[index].faculty = newFaculty;
    setCourses(updated);
  };

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name || !newCourse.department || !newCourse.faculty) return;
    setCourses([...courses, newCourse]);
    setNewCourse({ code: '', name: '', department: '', faculty: '' });
    setShowModal(false);
  };

  const { sideBarOpen } = useAuthStore();
  return (
    <div className={`p-6 bg-base-200 min-h-screen text-base-content transition-all duration-300 ${sideBarOpen ? 'ml-36' : 'ml-18'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-base-content">Manage Courses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-focus transition"
        >
          + Add Course
        </button>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto rounded-lg border border-base-300 shadow bg-base-100">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-base-200 text-base-content font-semibold">
            <tr>
              <th className="px-4 py-3 border border-base-300 w-[90px]">Code</th>
              <th className="px-4 py-3 border border-base-300">Course Name</th>
              <th className="px-4 py-3 border border-base-300">Department</th>
              <th className="px-4 py-3 border border-base-300">Faculty Assigned</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={idx} className="hover:bg-base-200">
                <td className="px-4 py-2 border border-base-300 font-semibold">{course.code}</td>
                <td className="px-4 py-2 border border-base-300">{course.name}</td>
                <td className="px-4 py-2 border border-base-300">{course.department}</td>
                <td className="px-4 py-2 border border-base-300">
                  <select
                    className="bg-base-200 p-2 rounded border border-base-300"
                    value={course.faculty}
                    onChange={(e) => handleFacultyChange(idx, e.target.value)}
                  >
                    {faculties.map((faculty, index) => (
                      <option key={index} value={faculty}>
                        {faculty}
                      </option>
                    ))}
                  </select>
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
            <h2 className="text-xl font-bold mb-4 text-base-content">Add New Course</h2>

            <input
              type="text"
              placeholder="Course Code (e.g., CSF307)"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value.toUpperCase() })}
              required
            />
            <input
              type="text"
              placeholder="Course Name"
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              required
            />

            <select
              className="w-full p-2 border border-base-300 rounded mb-3 bg-base-200 text-base-content"
              value={newCourse.department}
              onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border border-base-300 rounded mb-4 bg-base-200 text-base-content"
              value={newCourse.faculty}
              onChange={(e) => setNewCourse({ ...newCourse, faculty: e.target.value })}
            >
              <option value="">Assign Faculty</option>
              {faculties.map((fac, index) => (
                <option key={index} value={fac}>
                  {fac}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-base-200 border border-base-300 rounded hover:bg-base-300 text-base-content"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
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

export default ManageSubjects;
