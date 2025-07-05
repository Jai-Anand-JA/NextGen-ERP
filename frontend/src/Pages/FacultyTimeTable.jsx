import React from 'react';
import useAuthStore from '../store/authStore';
function FacultyTimetable() {
  const facultyId = 'fac001'; // Replace with auth/context

  const assignedCourses = [
    { courseId: 'CSF307', courseName: 'Technical Training 2' },
    { courseId: 'CSF101', courseName: 'Data Structures' },
  ];

  const timetable = [
    {
      courseId: 'CSF307',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      roomNo: 'B201',
    },
    {
      courseId: 'CSF101',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '11:00',
      roomNo: 'B301',
    },
    {
      courseId: 'CSF307',
      day: 'Thursday',
      startTime: '14:00',
      endTime: '15:00',
      roomNo: 'B201',
    },
    {
      courseId: 'CSF101',
      day: 'Friday',
      startTime: '12:00',
      endTime: '13:00',
      roomNo: 'B301',
    },
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const assignedCourseIds = assignedCourses.map((c) => c.courseId);

  const getCourseName = (courseId) => {
    const course = assignedCourses.find((c) => c.courseId === courseId);
    return course?.courseName || courseId;
  };
  const { sideBarOpen } = useAuthStore();
  return (
    <div className={`p-6 ${sideBarOpen ? 'ml-56' : 'ml-20'} transition-all duration-300`}>
      {/* ✅ Only this heading is centered */}
      <h1 className="text-2xl font-semibold mb-6 text-base-content text-center">
        This Week's Timetable
      </h1>

      <div className="flex flex-col space-y-6">
        {daysOfWeek.map((day) => {
          const entries = timetable.filter(
            (entry) => entry.day === day && assignedCourseIds.includes(entry.courseId)
          );

          return (
            <div key={day} className="flex gap-6">
              {/* Left Column: Day Label */}
              <div className="w-32 shrink-0 flex items-center justify-end text-base-content font-medium">
                {day}
              </div>

              {/* Right Column: Cards */}
              <div className="flex flex-col gap-3 w-full">
                {entries.length === 0 ? (
                  <div className="bg-base-200 border border-base-300 rounded-xl p-4 shadow w-full max-w-sm text-sm text-base-content/50">
                    No classes.
                  </div>
                ) : (
                  entries.map((entry, idx) => (
                    <div
                      key={idx}
                      className="bg-base-200 border border-base-300 rounded-xl p-4 shadow w-full max-w-sm"
                    >
                      <div className="font-semibold text-base-content">
                        {getCourseName(entry.courseId)}
                      </div>
                      <div className="text-sm text-base-content/70">
                        {entry.startTime} - {entry.endTime} | Room: {entry.roomNo}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FacultyTimetable;
