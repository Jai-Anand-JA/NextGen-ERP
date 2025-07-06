import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const MyCourses = () => {
  const { sideBarOpen, subjects, getCourses, isLoading } = useAuthStore();

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <div className={`p-4 bg-gray-800 min-h-screen text-white transition-all duration-300 ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h2 className="text-xl font-bold mb-6 text-white">My Courses</h2>

      {isLoading ? (
        <div className="text-center text-gray-300">Loading courses...</div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(subjects) && subjects.length > 0 ? (
            subjects.map((subject) => (
              <div
                key={subject._id}
                className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{subject.name} ({subject.code})</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Department: {subject.department} | Credits: {subject.credits}
                  </p>
                  <p className="text-sm text-gray-400">
                    Year: {subject.year} | Semester: {subject.semester}
                  </p>
                </div>

                <div className="text-sm text-gray-300 md:text-right">
                  <p className="font-medium text-white">Faculty:</p>
                  <p>{Array.isArray(subject.faculty) ? subject.faculty.map(f => f.name).join(', ') : 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No courses assigned yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export { MyCourses };
