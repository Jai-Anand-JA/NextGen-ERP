import React from 'react';
import { User, Book, Clipboard, Airplay, Landmark, LogOut, Sheet } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function StudentSidebar() {
  const { sideBarOpen, setSidebarOpen, logout } = useAuthStore();
  const navigate = useNavigate();

  const navItemClasses = ({ isActive }) =>
    `flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
      isActive ? 'bg-primary text-white' : 'hover:bg-base-200 text-gray-300'
    }`;

  const handleLogout = async () => {
    await logout();
    window.location.reload(); // Force full page reload after logout
  };

  return (
    <div
      className={`transition-all duration-300 
        ${sideBarOpen ? 'w-56' : 'w-20'} 
        h-screen border-r border-base-300 p-4 flex flex-col
        bg-gray-900 text-neutral-content fixed top-0 left-0 z-40 
        overflow-hidden`}
      onMouseEnter={() => setSidebarOpen()}
      onMouseLeave={() => setSidebarOpen()}
    >
      {/* === Top === */}
      <NavLink to="/dashboard">
        <div className="flex items-center gap-2 mb-4 mt-1">
          <Airplay className={`w-6 h-6 text-primary ${sideBarOpen ? '' : 'ml-2'}`} />
          {sideBarOpen && <span className="text-white text-lg font-bold">NextGen-ERP</span>}
        </div>
      </NavLink>

      {sideBarOpen && <hr className="border-white/40 mb-2" />}

      {/* === Menu Items === */}
      <div className="menu space-y-2 w-full">
        <NavLink to="/profile" className={navItemClasses}>
          <User className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Profile</span>}
        </NavLink>

        <NavLink to="/my-courses" className={navItemClasses}>
          <Book className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Courses</span>}
        </NavLink>

        <NavLink to="/my-grades" className={navItemClasses}>
          <Clipboard className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Grades</span>}
        </NavLink>

        <NavLink to="/fees" className={navItemClasses}>
          <Landmark className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Fees</span>}
        </NavLink>

        <NavLink to="/my-attendance" className={navItemClasses}>
          <Sheet className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Attendance</span>}
        </NavLink>
      </div>

      <div className="flex-grow" />

      {/* === Logout === */}
      <div
        className="flex items-center p-2 rounded-md hover:bg-red-600 cursor-pointer bg-primary transition-colors duration-200"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 text-white" />
        {sideBarOpen && <span className="text-base font-bold text-white ml-2">Logout</span>}
      </div>
    </div>
  );
}

export default StudentSidebar;
