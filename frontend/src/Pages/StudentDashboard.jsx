import React from 'react';
import { CalendarDays } from 'lucide-react';
import useAuthStore from '../store/authStore';

function StudentDashboard() {
     const { sideBarOpen } = useAuthStore();
  return (
  
    <div className={`p-6 bg-gray-800 min-h-screen text-white transition-all duration-300  ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      {/* Title */}
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
              <p className="mt-2 text-2xl">0%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-sm">0%</div>
          </div>

          <div className="bg-gray-600 p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-300">Current</p>
              <h2 className="font-bold text-lg">CGPA</h2>
              <p className="mt-2 text-2xl">8.96</p>
            </div>
            <span className="text-3xl">🎯</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-600 p-4 rounded shadow text-sm">
          <h2 className="text-lg font-bold">Karan Patil</h2>
          <p className="text-gray-300 mt-1">+91 9307607903</p>
          <p className="text-gray-300">1000018766@dit.edu.in</p>
          <p className="mt-2 text-gray-200">Bachelor of Technology in Computer Science and Engineering</p>
          <hr className="my-3 border-gray-400" />
          <p><strong>ERP ID:</strong> 1000018766</p>
          <p><strong>Roll No:</strong> 220102555</p>
          <p><strong>Intake Year:</strong> 2022</p>
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
          <div className="text-center text-gray-300 py-6">No Classes Today</div>
        </div>

        {/* Attendance */}
        <div className="bg-gray-600 p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">My Attendance</h2>

          <div className="flex justify-between items-center border-b border-gray-500 py-2">
            <div>
              <p className="font-semibold text-blue-300">CSF307</p>
              <p className="text-sm">Technical Training 2</p>
              <p className="text-xs text-yellow-300">Pooja Gupta</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-sm">0%</div>
          </div>

          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-semibold text-blue-300">MEF483</p>
              <p className="text-sm">Entrepreneurship and Start-ups</p>
              <p className="text-xs text-yellow-300">Moumita Ghosh</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-sm">0%</div>
          </div>
        </div>
      </div>

      {/* Notices */}
      <div className="bg-gray-600 p-4 rounded shadow mt-6">
        <div className="tabs text-white">
          <a className="tab tab-bordered tab-active">Notice</a>
          <a className="tab tab-bordered">Exam Notice</a>
        </div>
        <div className="text-center text-gray-300 py-6">Coming Soon...</div>
      </div>
    </div>
  );
}

export default StudentDashboard;
