import React from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

const AttendanceHistoryCard = ({ subjectName, subjectCode, facultyName, date, status }) => {
  const isPresent = status === 'Present';

  return (
    <div className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      
      {/* Left Info */}
      <div>
        <h3 className="text-lg font-semibold">{subjectName} ({subjectCode})</h3>
        <p className="text-sm text-gray-300">Faculty: {facultyName}</p>
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(date).toLocaleDateString()}
        </div>
      </div>

      {/* Right Status */}
      <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium 
        ${isPresent ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
        {isPresent ? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
        {status}
      </div>
    </div>
  );
};

export default AttendanceHistoryCard;
