import React from 'react';
import AttendanceHistoryCard from '../components/AttendanceHistoryCard';
import useAuthStore from '../store/authStore';

const dummyAttendanceData = [
  {
    _id: '1',
    subjectId: { code: 'CSE202', name: 'Operating Systems' },
    facultyId: { name: 'Dr. Neha Sharma' },
    date: '2025-07-01T00:00:00.000Z',
    status: 'Present',
  },
  {
    _id: '2',
    subjectId: { code: 'CSF307', name: 'Technical Training 2' },
    facultyId: { name: 'Pooja Gupta' },
    date: '2025-06-28T00:00:00.000Z',
    status: 'Absent',
  },
  {
    _id: '3',
    subjectId: { code: 'CSE101', name: 'Data Structures' },
    facultyId: { name: 'Dr. Sameer Ali' },
    date: '2025-06-25T00:00:00.000Z',
    status: 'Present',
  },
];

const MyAttendanceHistory = () => {
  const { sideBarOpen } = useAuthStore();

  return (
    <div className={`p-4 bg-gray-800 min-h-screen text-white transition-all duration-300 ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h2 className="text-2xl font-bold mb-6 text-white">Attendance History</h2>

      <div className="space-y-4">
        {dummyAttendanceData.map((entry) => (
          <AttendanceHistoryCard
            key={entry._id}
            subjectName={entry.subjectId.name}
            subjectCode={entry.subjectId.code}
            facultyName={entry.facultyId.name}
            date={entry.date}
            status={entry.status}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAttendanceHistory;
