import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { Loader } from 'lucide-react';

const MyAttendance = () => {
  const {
    sideBarOpen,
    attendance,
    overallPercentage,
    getStudentAttendanceSummary,
  } = useAuthStore();

  useEffect(() => {
    getStudentAttendanceSummary();
  }, []);

  const getRingStyle = (percentage) => {
    const isLow = percentage < 75;
    const ringColor = isLow ? '#ef4444' : '#10b981'; // red/green
    return {
      background: `conic-gradient(${ringColor} ${percentage * 3.6}deg, #4b5563 0deg)`,
    };
  };

  return (
    <div className={`p-4 bg-gray-800 min-h-screen text-white transition-all duration-300 ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h2 className="text-xl font-bold mb-6">My Attendance</h2>

      { attendance?.length > 0 ? (
        <>
          {/* ✅ Overall Attendance Ring */}
          <div className="bg-gray-700 text-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Overall Attendance</h3>
              <p className="text-sm text-gray-300 mt-1">Your overall attendance across all subjects</p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={getRingStyle(overallPercentage)}
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {overallPercentage}%
              </div>
            </div>
          </div>

          {/* ✅ Subject-wise Attendance Cards */}
          <div className="space-y-4">
            {attendance.map((entry, index) => {
              const percentage = entry.attendancePercentage;
              return (
                <div
                  key={index}
                  className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col gap-4 md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {entry.subjectName} ({entry.code})
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">Faculty: {entry.facultyName}</p>
                    <button
                      onClick={() => window.location.href = `/attendance-history/${entry.subjectId}`}
                      className="mt-2 px-3 py-1 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded transition"
                    >
                      View Attendance History
                    </button>
                  </div>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={getRingStyle(percentage)}
                  >
                    <div className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-300 mt-10">
          No attendance records available.
        </div>
      )}
    </div>
  );
};

export { MyAttendance };
