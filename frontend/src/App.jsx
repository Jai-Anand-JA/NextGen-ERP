import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StudentDashboard from './Pages/StudentDashboard.jsx';
import { MyCourses } from './Pages/MyCourses.jsx';
import { MyAttendance } from './Pages/MyAttendance.jsx';
import SignInPage from './Pages/SignInPage.jsx';
import ProfilePage from './Pages/StudentProfiePage.jsx';
import Details from './components/Details.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import StudentSidebar from './components/StudentSidebar.jsx';
import MyAttendanceHistory from './Pages/MyAttendanceHistory.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />

        {/* Public Route */}
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
      

        <Route path="/unauthorized" element={<h1>403 - Unauthorized Access</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
