import React, { useState } from 'react';
import useAuthStore from '../store/authStore';

function FacultyGrades() {
  const facultyId = 'fac001'; // example faculty

  const assignedCourses = [
    { courseId: 'CSF307', courseName: 'Technical Training 2' },
    { courseId: 'CSF101', courseName: 'Data Structures' },
  ];

  const studentData = {
    CSF307: [
      { studentId: 'stu001', name: 'Alice' },
      { studentId: 'stu002', name: 'Bob' },
    ],
    CSF101: [
      { studentId: 'stu003', name: 'Charlie' },
      { studentId: 'stu004', name: 'Diana' },
    ],
  };

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grades, setGrades] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { sideBarOpen } = useAuthStore();

  const handleGradeChange = (studentId, grade) => {
    setGrades((prev) => ({
      ...prev,
      [selectedCourse]: {
        ...(prev[selectedCourse] || {}),
        [studentId]: grade,
      },
    }));
  };

  const handleSubmit = () => {
    setSuccess('');
    setError('');

    const dataToSend = grades[selectedCourse];
    if (!dataToSend || Object.keys(dataToSend).length === 0) {
      setError('Please select grades for at least one student.');
      return;
    }

    // Simulate backend call
    console.log('Submitting grades:', {
      courseId: selectedCourse,
      grades: dataToSend,
    });

    setSuccess('Grades submitted successfully.');
  };

  const getGrade = (studentId) => grades[selectedCourse]?.[studentId] || '';

  return (
    <div className={`mx-auto p-6 ${false ? 'ml-56' : 'ml-20'} transition-all duration-300`}>
      <h1 className="text-2xl font-semibold mb-6 text-base-content text-center">Faculty Grades</h1>

      {/* Error/Success */}
      {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center mb-4">{success}</div>}

      {/* Course selection */}
      {!selectedCourse && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {assignedCourses.map((course) => (
            <div
              key={course.courseId}
              onClick={() => {
                setSelectedCourse(course.courseId);
                setError('');
                setSuccess('');
              }}
              className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-md cursor-pointer hover:bg-base-300 transition"
            >
              <h2 className="text-lg font-semibold text-base-content">{course.courseName}</h2>
              <p className="text-sm text-base-content/70">{course.courseId}</p>
            </div>
          ))}
        </div>
      )}

      {/* Grade marking */}
      {selectedCourse && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-base-content">
              {assignedCourses.find((c) => c.courseId === selectedCourse)?.courseName}
            </h2>
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-sm text-blue-500 underline"
            >
              ← Back to Courses
            </button>
          </div>

          <table className="table w-full bg-base-200 border border-base-300 rounded-xl">
            <thead>
              <tr className="text-base-content text-sm">
                <th className="py-2 px-4 text-left">Roll No.</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentData[selectedCourse].map((student) => (
                <tr key={student.studentId} className="border-t border-base-300">
                  <td className="py-2 px-4 text-base-content">{student.studentId}</td>
                  <td className="py-2 px-4 text-base-content">{student.name}</td>
                  <td className="py-2 px-4">
                    <select
                      value={getGrade(student.studentId)}
                      onChange={(e) => handleGradeChange(student.studentId, e.target.value)}
                      className="select select-bordered w-full max-w-xs bg-base-100 text-base-content"
                    >
                      <option value="">Select</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button onClick={handleSubmit} className="btn btn-primary px-6">
              Submit Grades
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyGrades;
