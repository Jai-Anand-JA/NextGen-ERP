import React from 'react'
import Navbar from './components/Navbar.jsx'
import StudentSidebar from './components/StudentSidebar.jsx'
import StudentDashboard from './Pages/StudentDashboard.jsx'
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <StudentSidebar/>
      <StudentDashboard/>
    </div>
  )
}

export default App
