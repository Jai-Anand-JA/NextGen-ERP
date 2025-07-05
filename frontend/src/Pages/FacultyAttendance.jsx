import React, { useState } from 'react';

function FacultyAttendance() {
  const facultyId = 'fac001';

  const assignedCourses = [
    { courseId: 'CSF307', courseName: 'Technical Training 2' },
    { courseId: 'CSF101', courseName: 'Data Structures' },
  ];

  const studentData = {
    CSF307: [
      { studentId: 'stu001', name: 'Alice' },
      { studentId: 'stu002', name: 'Bob' },
    ],
    CSF101: [
      { studentId: 'stu003', name: 'Charlie' },
      { studentId: 'stu004', name: 'Diana' },
    ],
  };

  const timetable = [
    { courseId: 'CSF307', day: 'Monday' },
    { courseId: 'CSF101', day: 'Tuesday' },
    { courseId: 'CSF307', day: 'Thursday' },
    { courseId: 'CSF101', day: 'Friday' },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const isClassHeldOnDate = () => {
    if (!selectedCourse) return false;
    const selectedDay = getDayOfWeek(date);
    return timetable.some(
      (entry) => entry.courseId === selectedCourse && entry.day === selectedDay
    );
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedCourse]: {
        ...(prev[selectedCourse] || {}),
        [date]: {
          ...(prev[selectedCourse]?.[date] || {}),
          [studentId]: status,
        },
      },
    }));
  };

  const getStatus = (studentId) => {
    return attendance[selectedCourse]?.[date]?.[studentId] || '';
  };

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    if (!isClassHeldOnDate()) {
      setError('No class scheduled on the selected date.');
      return;
    }

    const dataToSend = attendance[selectedCourse]?.[date];
    if (!dataToSend || Object.keys(dataToSend).length === 0) {
      setError('Please mark attendance for at least one student.');
      return;
    }

    // 🔁 Simulate backend call
    console.log('Submitting attendance:', {
      courseId: selectedCourse,
      date,
      data: dataToSend,
    });

    setSuccess('Attendance submitted successfully.');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-base-content text-center">Faculty Attendance</h1>

      {/* Date Picker */}
      <div className="mb-6 text-center">
        <label className="text-base-content mr-2 font-medium">Select Date:</label>
        <input
          type="date"
          className="input input-bordered bg-base-200 border-base-300 text-base-content"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setError('');
            setSuccess('');
          }}
        />
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="text-red-500 text-sm text-center mb-4">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-sm text-center mb-4">{success}</div>
      )}

      {/* Course List */}
      {!selectedCourse && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {assignedCourses.map((course) => (
            <button
              key={course.courseId}
              onClick={() => {
                setSelectedCourse(course.courseId);
                setError('');
                setSuccess('');
              }}
              className="bg-base-200 border border-base-300 rounded-xl p-4 shadow hover:bg-base-300 transition"
            >
              <h2 className="font-semibold text-base-content">{course.courseName}</h2>
              <p className="text-sm text-base-content/70">{course.courseId}</p>
            </button>
          ))}
        </div>
      )}

      {/* Student Attendance Table */}
      {selectedCourse && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-base-content">
              {assignedCourses.find((c) => c.courseId === selectedCourse)?.courseName}
            </h2>
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-sm text-blue-500 underline"
            >
              ← Back to Courses
            </button>
          </div>

          <table className="table w-full bg-base-200 border border-base-300 rounded-xl">
            <thead>
              <tr className="text-base-content text-sm">
                <th className="py-2 px-4 text-left">Student</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentData[selectedCourse].map((student) => (
                <tr key={student.studentId} className="border-t border-base-300">
                  <td className="py-2 px-4 text-base-content">
                    {student.name}
                    <span className="text-xs text-base-content/50 ml-1">
                      ({student.studentId})
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1 text-sm text-green-500">
                        <input
                          type="radio"
                          name={`status-${student.studentId}`}
                          checked={getStatus(student.studentId) === 'present'}
                          onChange={() => handleAttendanceChange(student.studentId, 'present')}
                        />
                        Present
                      </label>
                      <label className="flex items-center gap-1 text-sm text-red-500">
                        <input
                          type="radio"
                          name={`status-${student.studentId}`}
                          checked={getStatus(student.studentId) === 'absent'}
                          onChange={() => handleAttendanceChange(student.studentId, 'absent')}
                        />
                        Absent
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Confirm Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              className="btn btn-primary px-6"
            >
              Confirm Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyAttendance;
