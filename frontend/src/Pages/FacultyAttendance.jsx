import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';
import { ArrowLeft, Loader } from 'lucide-react';

function FacultyAttendance() {
  const {
    subjects,
    students,
    getFacultySubjects,
    getStudentsBySubject,
    isLoading,
  } = useAuthStore();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getFacultySubjects();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      getStudentsBySubject(selectedCourse);
    }
  }, [selectedCourse]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const getStatus = (studentId) => attendance[studentId] || '';

  const handleSubmit = async () => {
    const presentStudentIds = Object.entries(attendance)
      .filter(([_, status]) => status === 'present')
      .map(([id]) => id);

    if (presentStudentIds.length === 0) {
      toast.error('Please mark at least one student as present.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axiosInstance.post('/api/faculty/attendance/mark', {
        subjectId: selectedCourse,
        date,
        studentIds: presentStudentIds,
      });

      if (res.status === 201) {
        toast.success('Attendance submitted successfully.');
        setAttendance({});
        setSelectedCourse(null);
      } else {
        toast.error('Something went wrong.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit attendance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-base-content text-center">
        Mark Attendance
      </h1>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin h-10 w-10 text-blue-500" />
        </div>
      )}

      {/* Course Cards */}
      {!isLoading && !selectedCourse && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subjects?.map((course) => (
            <div
              key={course._id}
              className="bg-base-200 border border-base-300 rounded-xl p-6 shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-base-content flex items-center gap-2 mb-2">
                  📖 {course.name}
                </h2>
                <p className="text-sm text-base-content/70 mb-1">
                  <span className="font-medium">Code:</span> {course.code}
                </p>
                <p className="text-sm text-base-content/70 mb-1">
                  <span className="font-medium">Department:</span> {course.department || 'N/A'}
                </p>
                <p className="text-sm text-base-content/70 mb-4">
                  <span className="font-medium">Semester:</span> {course.semester}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(course._id)}
                className="mt-auto btn btn-primary w-fit self-start"
              >
                Mark Attendance
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Attendance Marking View */}
      {!isLoading && selectedCourse && (
        <div className="max-w-5xl mx-auto mt-4">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-base-content">
              {subjects?.find((s) => s._id === selectedCourse)?.name}
            </h2>

            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 text-sm font-medium px-3 py-1.5 rounded transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </button>
          </div>

          {/* Date Picker */}
          <div className="mb-6 flex justify-end">
            <label className="text-base-content mr-2 font-medium self-center">Date:</label>
            <input
              type="date"
              className="input input-bordered bg-base-200 border-base-300 text-base-content"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Students List */}
          <div className="grid gap-4">
            {students?.map((student) => (
              <div
                key={student._id}
                className="bg-base-200 border border-base-300 rounded-lg p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-base-content text-lg">{student.name}</h3>
                  <p className="text-sm text-base-content/70">
                    Roll No: {student.rollNumber}
                  </p>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm text-green-500 font-medium">
                    <input
                      type="radio"
                      name={`status-${student._id}`}
                      checked={getStatus(student._id) === 'present'}
                      onChange={() => handleAttendanceChange(student._id, 'present')}
                    />
                    Present
                  </label>
                  <label className="flex items-center gap-1 text-sm text-red-500 font-medium">
                    <input
                      type="radio"
                      name={`status-${student._id}`}
                      checked={getStatus(student._id) === 'absent'}
                      onChange={() => handleAttendanceChange(student._id, 'absent')}
                    />
                    Absent
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="btn btn-primary px-6 min-w-[180px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin h-5 w-5" />
                  Submitting...
                </span>
              ) : (
                'Confirm Attendance'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyAttendance;
