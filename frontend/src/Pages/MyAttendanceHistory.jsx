import React, { useEffect } from 'react';
import AttendanceHistoryCard from '../components/AttendanceHistoryCard';
import useAuthStore from '../store/authStore';
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';

const MyAttendanceHistory = () => {
  const { sideBarOpen, getStudentAttendanceHistory, attendanceHistory, isLoading } = useAuthStore();
  const { id: subjectId } = useParams(); // ✅ Matches route param

  useEffect(() => {
    if (subjectId) {
      getStudentAttendanceHistory(subjectId);
    }
  }, [subjectId]);

  console.log(attendanceHistory)
  return (
    <div
      className={`p-4 bg-gray-800 min-h-screen text-white transition-all duration-300 ${
        sideBarOpen ? 'ml-56' : 'ml-20'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Attendance History</h2>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Loader className="animate-spin text-white" />
        </div>
      ) : attendanceHistory.length > 0 ? (
        <div className="space-y-4">
          {attendanceHistory.map((entry) => (
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
      ) : (
        <div className="text-center text-gray-300 mt-10">
          No attendance history available.
        </div>
      )}
    </div>
  );
};

export default MyAttendanceHistory;
