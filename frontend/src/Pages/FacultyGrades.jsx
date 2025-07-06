import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Loader } from 'lucide-react';
import { axiosInstance } from '../lib/axiosInstance';

function FacultyGrades() {
  const {
    sideBarOpen,
    subjects,
    students,
    getFacultySubjects,
    getStudentsBySubject,
    isLoading
  } = useAuthStore();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grades, setGrades] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getFacultySubjects(); // Fetch subjects on mount
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      getStudentsBySubject(selectedCourse); // Fetch students for selected course
    }
  }, [selectedCourse]);

  const handleGradeChange = (studentId, grade) => {
    setGrades((prev) => ({
      ...prev,
      [selectedCourse]: {
        ...(prev[selectedCourse] || {}),
        [studentId]: grade,
      },
    }));
  };

  const handleSubmit = async () => {
    const dataToSend = grades[selectedCourse];

    if (!dataToSend || Object.keys(dataToSend).length === 0) {
      toast.error('Please select grades for at least one student.');
      return;
    }

    setIsSubmitting(true);

    try {
      const promises = Object.entries(dataToSend).map(([studentId, grade]) =>
        axiosInstance.post('/api/faculty/grades/assign', {
          studentId,
          subjectId: selectedCourse,
          grade,
        })
      );

      const results = await Promise.allSettled(promises);

      const successCount = results.filter((r) => r.status === 'fulfilled').length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        toast.success(`${successCount} grade(s) submitted successfully!`);
      }
      if (failCount > 0) {
        toast.error(`${failCount} submission(s) failed.`);
      }

      setSelectedCourse(null);
      setGrades({});
    } catch (error) {
      console.error('Grade submission error:', error);
      toast.error('Something went wrong while submitting grades.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGrade = (studentId) => grades[selectedCourse]?.[studentId] || '';

  return (
    <div className={`mx-auto p-6 ${sideBarOpen ? 'ml-56' : 'ml-20'} transition-all duration-300`}>
      <h1 className="text-2xl font-semibold mb-6 text-base-content text-center">Faculty Grades</h1>

      {!selectedCourse && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {subjects?.map((course) => (
            <div
              key={course._id}
              onClick={() => setSelectedCourse(course._id)}
              className="bg-base-200 border border-base-300 rounded-xl p-6 shadow hover:shadow-lg cursor-pointer transition"
            >
              <h2 className="text-xl font-semibold text-base-content flex items-center gap-2 mb-2">
                📘 {course.name}
              </h2>
              <p className="text-sm text-base-content/70 mb-1">
                <span className="font-medium">Course Code:</span> {course.code}
              </p>
              <button className="btn btn-primary mt-4">Mark Grades</button>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-base-content">
              {subjects?.find((c) => c._id === selectedCourse)?.name}
            </h2>
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 text-sm font-medium px-3 py-1.5 rounded transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <Loader className="animate-spin w-6 h-6 mx-auto text-blue-500" />
              <p className="text-base-content mt-2">Loading students...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full bg-base-200 border border-base-300 rounded-xl">
                <thead>
                  <tr className="text-base-content text-sm">
                    <th className="py-2 px-4 text-left">Roll No.</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student) => (
                    <tr key={student._id} className="border-t border-base-300">
                      <td className="py-2 px-4 text-base-content">{student.rollNumber}</td>
                      <td className="py-2 px-4 text-base-content">{student.name}</td>
                      <td className="py-2 px-4">
                        <select
                          value={getGrade(student._id)}
                          onChange={(e) => handleGradeChange(student._id, e.target.value)}
                          className="select select-bordered w-full bg-base-100 text-base-content"
                        >
                          <option value="">Select</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary px-6 min-w-[180px]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin h-5 w-5" /> Submitting...
                </span>
              ) : (
                'Submit Grades'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyGrades;
