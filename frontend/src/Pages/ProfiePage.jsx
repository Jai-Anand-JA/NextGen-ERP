import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center mb-8">
        NextGen-ERP
      </h1>

      <div className="flex space-x-4 mb-8">
        <Link to="details" className="btn w-32 bg-primary/10 text-primary hover:bg-primary/20 transition">
          Details
        </Link>
        <Link to="idcard" className="btn w-32 bg-primary/10 text-primary hover:bg-primary/20 transition">
          ID Card
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default ProfilePage;
