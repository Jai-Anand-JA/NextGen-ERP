import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

function FacultyCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const dummyCourses = [
    {
      courseId: 'CSF307',
      courseName: 'Technical Training 2',
      studentsEnrolled: 43,
    },
    {
      courseId: 'CSF101',
      courseName: 'Data Structures',
      studentsEnrolled: 38,
    },
    {
      courseId: 'CSF205',
      courseName: 'Operating Systems',
      studentsEnrolled: 29,
    },
  ];

  const studentData = {
    CSF307: [
      { studentId: 'stu001', name: 'Alice', attendancePercentage: '91%' },
      { studentId: 'stu002', name: 'Bob', attendancePercentage: '86%' },
    ],
    CSF101: [
      { studentId: 'stu003', name: 'Charlie', attendancePercentage: '95%' },
      { studentId: 'stu004', name: 'Diana', attendancePercentage: '91%' },
    ],
    CSF205: [
      { studentId: 'stu005', name: 'Eva', attendancePercentage: '82%' },
      { studentId: 'stu006', name: 'Frank', attendancePercentage: '77%' },
    ],
  };

  useEffect(() => {
    setCourses(dummyCourses);
  }, []);

  const { sideBarOpen } = useAuthStore();

  const selectedCourseData = selectedCourse
    ? courses.find((c) => c.courseId === selectedCourse)
    : null;

  return (
    <div className={`mx-auto p-6 ${sideBarOpen ? 'ml-56' : 'ml-20'} transition-all duration-300`}>
      <h1 className="text-2xl font-semibold mb-6 text-base-content">
        {selectedCourseData ? `Students in ${selectedCourseData.courseName}` : 'Assigned Courses'}
      </h1>

      {/* Back Button */}
      {selectedCourse && (
        <button
          onClick={() => setSelectedCourse(null)}
          className="mb-4 text-sm text-blue-500 underline"
        >
          ← Back to Courses
        </button>
      )}

      {/* Show Students in Selected Course */}
      {selectedCourse ? (
        <div className="overflow-x-auto max-w-3xl">
          <table className="table w-full bg-base-200 border border-base-300 rounded-xl">
            <thead>
              <tr className="text-base-content text-sm">
                <th className="py-2 px-4 text-left">Roll No.</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {studentData[selectedCourse]?.map((student) => (
                <tr key={student.studentId} className="border-t border-base-300">
                  <td className="py-2 px-4 text-base-content">{student.studentId}</td>
                  <td className="py-2 px-4 text-base-content">{student.name}</td>
                  <td className="py-2 px-4 text-base-content font-medium">{student.attendancePercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Show Course Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="bg-base-200 border border-base-300 rounded-2xl p-5 shadow-md max-w-sm mx-auto w-full cursor-pointer hover:bg-base-300 transition"
              onClick={() => setSelectedCourse(course.courseId)}
            >
              <h2 className="text-lg font-medium text-base-content">{course.courseName}</h2>
              <p className="text-sm text-base-content/70">{course.courseId}</p>
              <div className="mt-4">
                <span className="text-sm text-base-content/60">Students Enrolled: </span>
                <span className="font-bold text-base-content">{course.studentsEnrolled}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FacultyCourses;
