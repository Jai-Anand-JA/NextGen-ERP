import React from 'react';
import useAuthStore from '../store/authStore';
import NoticeBoard from '../components/NoticeBoard'; // Adjust path if needed
import { Users, User, Shield, Building2 } from 'lucide-react';

function AdminDashboard() {
  const { sideBarOpen } = useAuthStore();

  const notices = [
    {
      title: 'End Term Examination End Term',
      content: "Lorem Ipsum has been the industry's standard dummy",
    },
    {
      title: 'Holidays Holidays Holidays Holidays',
      content: 'It is a long established fact that a reader will be',
    },
    {
      title: 'Admissions Admissions Admissions...',
      content: 'Piece of classical Latin literature from 45 BC, making it',
    },
  ];

  return (
    <div className={`transition-all duration-300 min-h-screen p-6 bg-base-100 text-white ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      {/* === Top Stats Cards === */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-base-200 rounded-lg p-4 flex items-center gap-3 shadow">
          <Users className="w-6 h-6 text-orange-400" />
          <div>
            <p className="text-sm text-gray-400">Faculty</p>
            <h3 className="text-lg font-bold">3</h3>
          </div>
        </div>
        <div className="bg-base-200 rounded-lg p-4 flex items-center gap-3 shadow">
          <User className="w-6 h-6 text-orange-400" />
          <div>
            <p className="text-sm text-gray-400">Student</p>
            <h3 className="text-lg font-bold">6</h3>
          </div>
        </div>
        <div className="bg-base-200 rounded-lg p-4 flex items-center gap-3 shadow">
          <Shield className="w-6 h-6 text-orange-400" />
          <div>
            <p className="text-sm text-gray-400">Admin</p>
            <h3 className="text-lg font-bold">3</h3>
          </div>
        </div>
        <div className="bg-base-200 rounded-lg p-4 flex items-center gap-3 shadow">
          <Building2 className="w-6 h-6 text-orange-400" />
          <div>
            <p className="text-sm text-gray-400">Department</p>
            <h3 className="text-lg font-bold">4</h3>
          </div>
        </div>
      </div>
       
       <div>
      {/* === Notice Board Component === */}
      <NoticeBoard notices={notices} />
    </div>
      
    </div>
  );
}

export default AdminDashboard;
