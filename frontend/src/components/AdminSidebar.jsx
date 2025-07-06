import React from 'react';
import { User, Users, Building2, Book, Landmark, Calendar, ScrollText, LogOut, Airplay } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function AdminSidebar() {
  const { sideBarOpen, setSidebarOpen ,logout} = useAuthStore();
  const navigate = useNavigate();

  const navItemClasses = 'flex items-center p-2 rounded-md hover:bg-base-200 cursor-pointer';

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
      {/* === Brand === */}
      <div className="menu space-y-2 w-full">
        <div className="flex items-center gap-2 mb-4 mt-1">
          <Airplay className={`w-6 h-6 text-primary ${sideBarOpen ? '' : 'ml-2'}`} />
          {sideBarOpen && <span className="text-white text-lg font-bold">NextGen-ERP</span>}
        </div>

        {sideBarOpen && <hr className="border-white/40 mb-2" />}

        {/* === Navigation Links === */}
        <NavLink to="/admin/faculty" className={navItemClasses}>
          <Users className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Faculty</span>}
        </NavLink>

        <NavLink to="/admin/students" className={navItemClasses}>
          <Users className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Students</span>}
        </NavLink>

        <NavLink to="/admin/departments" className={navItemClasses}>
          <Building2 className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Departments</span>}
        </NavLink>

        <NavLink to="/admin/courses" className={navItemClasses}>
          <Book className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Courses</span>}
        </NavLink>

        <NavLink to="/admin/fees" className={navItemClasses}>
          <Landmark className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Fees</span>}
        </NavLink>

        <NavLink to="/admin/timetable" className={navItemClasses}>
          <Calendar className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Timetable</span>}
        </NavLink>

        <NavLink to="/admin/notices" className={navItemClasses}>
          <ScrollText className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Notices</span>}
        </NavLink>
      </div>

      <div className="flex-grow" />

      {/* === Logout === */}
      <div
        className="flex items-center p-2 rounded-md hover:bg-red-600 cursor-pointer bg-primary transition-colors duration-200"
        onClick={ logout()}
      >
        <LogOut className="w-5 h-5 text-white" />
        {sideBarOpen && <span className="text-base font-bold text-white ml-2">Logout</span>}
      </div>
    </div>
  );
}

export default AdminSidebar;
