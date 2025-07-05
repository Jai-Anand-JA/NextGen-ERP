import React from 'react';
import { useNavigate } from 'react-router-dom';

const AttendanceCard = ({ subjectCode, subjectName, facultyName, attendancePercentage, subjectId }) => {
  const isLow = attendancePercentage < 75;
  const ringColor = isLow ? '#ef4444' : '#10b981'; // red/green
  const ringStyle = {
    background: `conic-gradient(${ringColor} ${attendancePercentage * 3.6}deg, #4b5563 0deg)`,
  };

  const navigate = useNavigate();

  const handleViewHistory = () => {
    navigate(`/attendance-history`);
  };

  return (
    <div className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col gap-4 md:flex-row justify-between items-start md:items-center">
      {/* Subject Info */}
      <div>
        <h3 className="text-lg font-semibold">{subjectName} ({subjectCode})</h3>
        <p className="text-sm text-gray-300 mt-1">Faculty: {facultyName}</p>
        <button
          onClick={handleViewHistory}
          className="mt-2 px-3 py-1 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded transition"
        >
          View Attendance History
        </button>
      </div>

      {/* Circular Progress Ring */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={ringStyle}
      >
        <div className="w-11 h-11 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {attendancePercentage}%
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
