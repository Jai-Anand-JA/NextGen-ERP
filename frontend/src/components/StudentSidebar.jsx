import React from 'react';
import { User, Book, Clipboard, Airplay, Landmark, LogOut, Sheet } from 'lucide-react';

function StudentSidebar() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div
      className={`transition-all duration-300 
        ${sidebarOpen ? 'w-56' : 'w-20'} 
        h-screen border-r border-base-300 p-4 flex flex-col
        bg-gray-900 text-neutral-content fixed top-0 left-0 z-40 
        overflow-hidden`}
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      {/* === Top Menu Items === */}
      <div className="menu space-y-2 w-full">
        <div className="flex items-center gap-2 mb-4 mt-1">
          <Airplay className={`w-6 h-6 text-primary ${sidebarOpen ? '' : 'ml-2'}`} />
          {sidebarOpen && <span className="text-white text-lg font-bold">NextGen-ERP</span>}
        </div>

        {sidebarOpen && <hr className="border-white/40 mb-2" />}

        <div className="flex items-center p-2 rounded-md hover:bg-base-200 cursor-pointer">
          <User className="w-5 h-5 text-primary mr-2" />
          {sidebarOpen && <span className="text-base font-bold">Profile</span>}
        </div>

        <div className="flex items-center p-2 rounded-md hover:bg-base-200 cursor-pointer">
          <Book className="w-5 h-5 text-primary mr-2" />
          {sidebarOpen && <span className="text-base font-bold">Courses</span>}
        </div>

        <div className="flex items-center p-2 rounded-md hover:bg-base-200 cursor-pointer">
          <Clipboard className="w-5 h-5 text-primary mr-2" />
          {sidebarOpen && <span className="text-base font-bold">Grades</span>}
        </div>

        <div className="flex items-center p-2 rounded-md hover:bg-base-200 cursor-pointer">
          <Landmark className="w-5 h-5 text-primary mr-2" />
          {sidebarOpen && <span className="text-base font-bold">Fees</span>}
        </div>

        <div className="flex items-center p-2 rounded-md hover:bg-base-200 cursor-pointer">
          <Sheet className="w-5 h-5 text-primary mr-2" />
          {sidebarOpen && <span className="text-base font-bold">Attendance</span>}
        </div>
      </div>

      {/* === Spacer to Push Logout Down === */}
      <div className="flex-grow" />

      {/* === Logout Button === */}
      <div className="flex items-center p-2 rounded-md hover:bg-red-600 cursor-pointer bg-primary transition-colors duration-200">
        <LogOut className="w-5 h-5 text-white" />
        {sidebarOpen && <span className="text-base font-bold text-white ml-2">Logout</span>}
      </div>
    </div>
  );
}

export default StudentSidebar;
