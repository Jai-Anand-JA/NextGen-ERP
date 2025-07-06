import React, { useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import useAuthStore from '../store/authStore';
import NoticeBoard from '../components/NoticeBoard';

function StudentDashboard() {
  const {
    sideBarOpen,
    userData,
    attendance,
    timetable,
    getStudentAttendanceSummary,
    getStudentTimeTable,
    overallPercentage,
    getUserData,
    getNotices,
    notices
  } = useAuthStore();

  console.log("User Notices", notices );
  useEffect(() => {
    getStudentAttendanceSummary();
    getStudentTimeTable();
    getNotices();
    getUserData();
  }, [getStudentAttendanceSummary, getStudentTimeTable,getUserData]);


  console.log(userData)
  // ✅ Glow ring style for attendance
  const getRingStyle = (percentage) => {
    const isLow = percentage < 75;
    const ringColor = isLow ? '#ef4444' : '#10b981'; // red / green
    return {
      borderColor: ringColor,
      boxShadow: `0 0 6px ${ringColor}, 0 0 12px ${ringColor}`,
    };
  };

  return (
    <div className={`p-6 bg-gray-800 min-h-screen text-white transition-all duration-300 ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h1 className="text-2xl font-bold text-center mb-6">STUDENT DASHBOARD</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <div className="bg-gray-600 p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-300">Current</p>
              <h2 className="font-bold text-lg">Outstanding Balance</h2>
              <p className="mt-2 text-2xl text-white">₹0</p>
            </div>
            <span className="text-3xl">💰</span>
          </div>

          <div className="bg-gray-600 p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-300">Next</p>
              <h2 className="font-bold text-lg">Due Fees</h2>
              <button className="mt-2 text-yellow-300 underline text-sm">Click To View</button>
            </div>
            <span className="text-3xl">📅</span>
          </div>

          <div className="bg-gray-600 p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-300">Overall</p>
              <h2 className="font-bold text-lg">Attendance</h2>
              <p className="mt-2 text-2xl">{overallPercentage || 0}%</p>
            </div>
            <div
              className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm text-white"
              style={getRingStyle(overallPercentage || 0)}
            >
              {overallPercentage || 0}%
            </div>
          </div>

          <div className="bg-gray-600 p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-300">Current</p>
              <h2 className="font-bold text-lg">CGPA</h2>
              <p className="mt-2 text-2xl">{userData?.cgpa || 0.0}</p>
            </div>
            <span className="text-3xl">🎯</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-600 p-4 rounded shadow text-sm">
          <h2 className="text-lg font-bold">{userData?.name || 'Student Name'}</h2>
          <p className="text-gray-300 mt-1">{userData?.phone || 'N/A'}</p>
          <p className="text-gray-300">{userData?.email || 'N/A'}</p>
          <p className="mt-2 text-gray-200">{userData?.course || 'Course Info'}</p>
          <hr className="my-3 border-gray-400" />
          <p><strong>ERP ID:</strong> {userData?._id}</p>
          <p><strong>Roll No:</strong> {userData?.rollNumber}</p>
          <p><strong>Intake Year:</strong> {userData?.year || 'N/A'}</p>
          <p><strong>Mentor:</strong> Not Yet Assigned</p>
          <button className="btn btn-sm mt-4 text-white border border-white hover:bg-white hover:text-gray-800">View details</button>
        </div>
      </div>

      {/* Timetable & Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Timetable */}
        <div className="bg-gray-600 p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">Today's Timetable</h2>
            <CalendarDays className="text-gray-300" />
          </div>

          {Array.isArray(timetable) && timetable.length > 0 ? (
            timetable.map((item, index) => (
              <div key={index} className="border-b border-gray-500 py-2">
                <p className="font-semibold text-blue-300">
                  {item.subjectId?.name || 'Unknown Subject'}
                </p>
                <p className="text-sm">{item.day} | {item.startTime} - {item.endTime}</p>
                <p className="text-xs text-yellow-300">Room: {item.room}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-300 py-6">No Classes Today</div>
          )}
        </div>

        {/* Attendance */}
        <div className="bg-gray-600 p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">My Attendance</h2>

          {Array.isArray(attendance) && attendance.length > 0 ? (
            attendance.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-500 py-2">
                <div>
                  <p className="font-semibold text-blue-300">{item.subjectCode || 'Code'}</p>
                  <p className="text-sm">{item.subjectName || 'Subject Name'}</p>
                  <p className="text-xs text-yellow-300">{item.facultyName || 'Faculty'}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm text-white"
                  style={getRingStyle(item.attendancePercentage || 0)}
                >
                  {item.attendancePercentage || 0}%
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-300 py-6">No attendance records available</div>
          )}
        </div>
      </div>

     <NoticeBoard  notices={notices} />
    </div>
  );
}

export default StudentDashboard;
