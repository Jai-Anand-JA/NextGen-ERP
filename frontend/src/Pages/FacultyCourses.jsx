import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { Loader, Users, BookOpen, PercentCircle } from "lucide-react";
import { toast } from "react-hot-toast";

function FacultyCourses() {
  const {
    sideBarOpen,
    getFacultySubjects,
    getStudentsBySubject,
    subjects,
    students,
    isLoading,
  } = useAuthStore();

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    getFacultySubjects();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      getStudentsBySubject(selectedCourseId);
    }
  }, [selectedCourseId]);

  const selectedCourse = subjects?.find((s) => s._id === selectedCourseId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div
      className={`mx-auto p-6 ${
        sideBarOpen ? "ml-56" : "ml-20"
      } transition-all duration-300`}
    >
      <h1 className="text-2xl font-semibold mb-6 text-base-content">
        {selectedCourse
          ? `Students in ${selectedCourse.name}`
          : "Assigned Courses"}
      </h1>

      {selectedCourseId && (
        <button
          onClick={() => setSelectedCourseId(null)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 font-medium px-3 py-1.5 rounded-md border border-blue-200 bg-blue-50 hover:bg-blue-100 transition"
        >
          <span className="text-xl">←</span>
          Back to Courses
        </button>
      )}

      {/* Student Cards */}
      {selectedCourseId ? (
        students?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => {
              const attendance = student.attendancePercentage ?? 0;
              const isHigh = attendance >= 75;
              const isSome = attendance > 0;

              return (
                <div
                  key={student._id}
                  className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{student.name}</h2>
                      <p className="text-sm text-gray-300">
                        Roll No: {student.rollNumber}
                      </p>
                      <p className="text-sm text-gray-400">
                        Dept: {student.department}
                      </p>
                      <p className="text-sm text-gray-400">
                        Class: {student.class}, Section: {student.section}
                      </p>
                    </div>

                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        isHigh
                          ? "bg-green-600"
                          : isSome
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      <PercentCircle className="w-4 h-4 mr-1" />
                      {attendance}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-base-content/60 mt-6">
            No students found for this course.
          </div>
        )
      ) : (
        // Course Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects?.length ? (
            subjects.map((subject) => (
              <div
                key={subject._id}
                className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-base-content/80" />
                  <h2 className="text-lg font-medium text-base-content">
                    {subject.name}
                  </h2>
                </div>

                <p className="text-sm text-base-content/70 mb-1">
                  Code: {subject.code}
                </p>
                <p className="text-sm text-base-content/70 mb-1">
                  Department: {subject.department || "N/A"}
                </p>
                <p className="text-sm text-base-content/70 mb-4">
                  Semester: {subject.semester || "N/A"}
                </p>

                <button
                  onClick={() => setSelectedCourseId(subject._id)}
                  className="mt-2 text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  View Enrolled Students
                </button>
              </div>
            ))
          ) : (
            <div className="text-base-content/70 col-span-full text-center">
              No subjects assigned
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FacultyCourses;
