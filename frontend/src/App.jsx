import React from 'react'
import Navbar from './components/Navbar.jsx'
import StudentSidebar from './components/StudentSidebar.jsx'
import StudentDashboard from './Pages/StudentDashboard.jsx'
import {MyCourses} from './Pages/MyCourses.jsx'
import {MyAttendance} from './Pages/MyAttendance.jsx'
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <StudentSidebar/> */}
      {/* <StudentDashboard/> */}
      {/* <MyCourses/> */}
      <MyAttendance/>
    </div>
  )
}

export default App
