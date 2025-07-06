import React, { useEffect } from 'react';
import useAuthStore from '../store/authStore';

function FacultyTimetable() {
  const {
    timetable,
    subjects,
    sideBarOpen,
    getFacultyTimetable,
    getFacultySubjects,
    isLoading,
  } = useAuthStore();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    getFacultySubjects();
    getFacultyTimetable();
  }, []);

  const getCourseName = (courseId) => {
    const course = subjects?.find((c) => c.code === courseId);
    return course?.name || courseId;
  };

  return (
    <div className={`p-6 ${sideBarOpen ? 'ml-56' : 'ml-20'} transition-all duration-300`}>
      <h1 className="text-2xl font-semibold mb-6 text-base-content text-center">
        This Week's Timetable
      </h1>

      {isLoading ? (
        <div className="text-center text-base-content/70">Loading timetable...</div>
      ) : (
        <div className="flex flex-col space-y-6">
          {daysOfWeek.map((day) => {
            const entries = timetable?.filter((entry) => entry.day === day) || [];

            return (
              <div key={day} className="flex gap-6">
                {/* Day Label */}
                <div className="w-32 shrink-0 flex items-center justify-end text-base-content font-medium">
                  {day}
                </div>

                {/* Timetable Entries */}
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
                          {entry.startTime} - {entry.endTime} | Room: {entry.room}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FacultyTimetable;
