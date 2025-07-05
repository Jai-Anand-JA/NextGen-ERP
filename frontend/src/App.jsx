import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Student Pages
import StudentDashboard from "./Pages/StudentDashboard.jsx";
import { MyCourses } from "./Pages/MyCourses.jsx";
import { MyAttendance } from "./Pages/MyAttendance.jsx";
import ProfilePage from "./Pages/StudentProfiePage.jsx";
import MyAttendanceHistory from "./Pages/MyAttendanceHistory.jsx";

// Admin Pages
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import ManageStudents from "./Pages/ManageStudents.jsx";
import ManageSubjects from "./Pages/ManageSubjects.jsx";
import ManageFaculty from "./Pages/ManageFaculty.jsx";
import ManageDepartment from "./Pages/Managedepartment.jsx";
import ManageTimeTable from "./Pages/ManageTimeTable.jsx";
import ManageNotices from "./Pages/ManageNotices.jsx";

// Shared Pages
import SignInPage from "./Pages/SignInPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Sidebars
import StudentSidebar from "./components/StudentSidebar.jsx";
import AdminSidebar from "./components/AdminSidebar.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignInPage />} />

        {/* Student Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="Student">
              <StudentSidebar />
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute role="Student">
              <StudentSidebar />
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-attendance"
          element={
            <ProtectedRoute role="Student">
              <StudentSidebar />
              <MyAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-history"
          element={
            <ProtectedRoute role="Student">
              <StudentSidebar />
              <MyAttendanceHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="Student">
              <StudentSidebar />
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faculty"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <ManageFaculty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <ManageDepartment/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <ManageSubjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fees"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <h1 className="ml-20 p-4 text-white">Fees Management</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/timetable"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <ManageTimeTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notices"
          element={
            <ProtectedRoute role="Admin">
              <AdminSidebar />
              <ManageNotices />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized Route */}
        <Route
          path="/unauthorized"
          element={<h1>403 - Unauthorized Access</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
