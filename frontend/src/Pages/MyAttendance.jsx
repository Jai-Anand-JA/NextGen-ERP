import React from 'react';

// ✅ Dummy Data
const attendanceData = [
  {
    _id: '1',
    studentId: 'stu001',
    subjectId: {
      _id: 'sub001',
      code: 'CSF307',
      name: 'Technical Training 2',
    },
    facultyId: {
      _id: 'fac001',
      name: 'Pooja Gupta',
    },
    attendancePercentage: 65,
  },
  {
    _id: '2',
    studentId: 'stu001',
    subjectId: {
      _id: 'sub002',
      code: 'CSE202',
      name: 'Operating Systems',
    },
    facultyId: {
      _id: 'fac002',
      name: 'Dr. Neha Sharma',
    },
    attendancePercentage: 82,
  }
];

// ✅ Attendance Card
const AttendanceCard = ({ subjectCode, subjectName, facultyName, attendancePercentage }) => {
  // Choose ring color based on attendance
  const isLow = attendancePercentage < 75;
  const ringColor = isLow ? '#ef4444' : '#10b981'; // red if low, green otherwise

  const ringStyle = {
    background: `conic-gradient(${ringColor} ${attendancePercentage * 3.6}deg, #4b5563 0deg)`,
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-500 p-3 bg-gray-600 rounded-md">
      <div>
        <p className="font-semibold text-blue-300">{subjectCode}</p>
        <p className="text-sm text-white">{subjectName}</p>
        <p className="text-xs text-yellow-300">{facultyName}</p>
      </div>

      {/* Circular Progress Ring */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white"
        style={{
          ...ringStyle,
          borderRadius: '50%',
          position: 'relative',
        }}
      >
        <div className="w-9 h-9 bg-gray-600 rounded-full flex items-center justify-center">
          {attendancePercentage}%
        </div>
      </div>
    </div>
  );
};



// ✅ Main Component
const MyAttendance = () => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow max-w-xl space-y-3">
      <h2 className="text-lg font-bold text-white mb-2">My Attendance</h2>
      {attendanceData.map((entry) => (
        <AttendanceCard
          key={entry._id}
          subjectCode={entry.subjectId.code}
          subjectName={entry.subjectId.name}
          facultyName={entry.facultyId.name}
          attendancePercentage={entry.attendancePercentage}
        />
      ))}
    </div>
  );
};

export { MyAttendance };
