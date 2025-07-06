import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';

function MyGrades() {
  const {
    grades,
    getGrades,
    userData,
    sideBarOpen,
    isLoading,
  } = useAuthStore();

  useEffect(() => {
    getGrades();
  }, [getGrades]);

  return (
    <div className={`p-6 bg-gray-800 min-h-screen text-white transition-all duration-300 ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h1 className="text-2xl font-bold mb-6 text-center">My Grades</h1>

      <div className="bg-gray-700 p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-white">Total CGPA</h2>
        <p className="text-2xl mt-2 text-green-400">{userData?.cgpa || 0.0}</p>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading grades...</p>
      ) : (
        <div className="space-y-4">
          {Array.isArray(grades) && grades.length > 0 ? (
            grades.map((grade, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">{grade.subjectName} ({grade.subjectCode})</h3>
                </div>
                <div className="text-2xl font-bold text-yellow-300">{grade.grade}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No grades available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MyGrades;
