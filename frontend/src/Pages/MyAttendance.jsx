import React from 'react';
import useAuthStore from '../store/authStore'; // Adjust path if needed
import AttendanceCard from '../components/AttendanceCard'; // Adjust path if needed
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


// ✅ Main Page
const MyAttendance = () => {
  const { sideBarOpen } = useAuthStore();

  return (
    <div className={`p-4 bg-gray-800 min-h-screen text-white transition-all duration-300 ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h2 className="text-xl font-bold mb-6 text-white">My Attendance</h2>

      <div className="space-y-4">
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
    </div>
  );
};

export { MyAttendance };
