import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import NoticeBoard from '../components/NoticeBoard';
import { Users, User, Shield, Building2 } from 'lucide-react';


function AdminDashboard() {
  const {
    sideBarOpen,
    getAllData,
    getNotices,
    faculties,
    students,
    departments,
    notices,
    checkAuth
  } = useAuthStore();

   useEffect(() => {
     checkAuth();
      getAllData();
      getNotices();
   }, [checkAuth, getAllData, getNotices]);
  return (
    <div
      className={`transition-all duration-300 min-h-screen p-6 bg-base-100 text-white ${
        sideBarOpen ? 'ml-56' : 'ml-20'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* === Stats Cards === */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={<Users className="w-6 h-6 text-orange-400" />} label="Faculty" count={faculties?.length || 0} />
        <StatsCard icon={<User className="w-6 h-6 text-orange-400" />} label="Students" count={students?.length || 0} />
        <StatsCard icon={<Shield className="w-6 h-6 text-orange-400" />} label="Admins" count={1} />
        <StatsCard icon={<Building2 className="w-6 h-6 text-orange-400" />} label="Departments" count={departments?.length || 0} />
      </div>

      {/* === Notice Board === */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Notices</h3>
        <NoticeBoard notices={notices || []} />
      </div>
    </div>
  );
}

function StatsCard({ icon, label, count }) {
  return (
    <div className="bg-base-200 rounded-lg p-4 flex items-center gap-3 shadow">
      {icon}
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <h3 className="text-lg font-bold">{count}</h3>
      </div>
    </div>
  );
}

export default AdminDashboard;
