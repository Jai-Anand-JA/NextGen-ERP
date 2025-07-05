import React from 'react';
import { User, Book, Clipboard, Sheet, Clock, Airplay, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function FacultySidebar() {
  const { sideBarOpen, setSidebarOpen } = useAuthStore();
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
      {/* === Top === */}
      <div className="menu space-y-2 w-full">
        <div className="flex items-center gap-2 mb-4 mt-1">
          <Airplay className={`w-6 h-6 text-primary ${sideBarOpen ? '' : 'ml-2'}`} />
          {sideBarOpen && <span className="text-white text-lg font-bold">NextGen-ERP</span>}
        </div>

        {sideBarOpen && <hr className="border-white/40 mb-2" />}

        {/* === Menu Items === */}
        {/* <NavLink to="/faculty/profile" className={navItemClasses}>
          <User className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Profile</span>}
        </NavLink> */}

        <NavLink to="/faculty/my-courses" className={navItemClasses}>
          <Book className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Courses</span>}
        </NavLink>

        <NavLink to="/faculty/my-attendance" className={navItemClasses}>
          <Sheet className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Attendance</span>}
        </NavLink>

        <NavLink to="/faculty/grades" className={navItemClasses}>
          <Clipboard className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Grades</span>}
        </NavLink>

        <NavLink to="/faculty/timetable" className={navItemClasses}>
          <Clock className="w-5 h-5 text-primary mr-2" />
          {sideBarOpen && <span className="text-base font-bold">Timetable</span>}
        </NavLink>
      </div>

      {/* === Spacer === */}
      <div className="flex-grow" />

      {/* === Logout === */}
      <div
        className="flex items-center p-2 rounded-md hover:bg-red-600 cursor-pointer bg-primary transition-colors duration-200"
        onClick={() => navigate('/sign-in')}
      >
        <LogOut className="w-5 h-5 text-white" />
        {sideBarOpen && <span className="text-base font-bold text-white ml-2">Logout</span>}
      </div>
    </div>
  );
}

export default FacultySidebar;
