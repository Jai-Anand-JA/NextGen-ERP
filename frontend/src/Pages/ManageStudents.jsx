import React, { useState, useEffect } from 'react';

const courses = [
  { label: 'B.Tech Computer Science', code: 'BTECH' },
  { label: 'BBA', code: 'BBA' },
  { label: 'MBA', code: 'MBA' },
];

const departments = [
  { label: 'Computer Science Engineering', code: 'CSE' },
  { label: 'Electronics and Communication', code: 'ECE' },
  { label: 'Mechanical Engineering', code: 'ME' },
];

const genders = ['Male', 'Female', 'Other'];

const ManageStudents = () => {
  const [studentCount, setStudentCount] = useState(1); // simulate backend count
  const [student, setStudent] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    gender: '',
    course: '',
    department: '',
    startYear: '',
    endYear: '',
    rollNumber: '',
  });

  useEffect(() => {
    // Auto-generate roll number
    if (student.course && student.department) {
      const courseCode = courses.find(c => c.label === student.course)?.code || 'XX';
      const deptCode = departments.find(d => d.label === student.department)?.code || 'YY';
      const serial = String(22010000 + studentCount);
      setStudent(prev => ({
        ...prev,
        rollNumber: `${serial}`
      }));
    }
  }, [student.course, student.department, studentCount]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student enrolled:', student);
    alert("Student enrolled successfully!");
    setStudentCount(prev => prev + 1); // simulate incremented roll
    setStudent({
      name: '',
      age: '',
      phone: '',
      email: '',
      gender: '',
      course: '',
      department: '',
      startYear: '',
      endYear: '',
      rollNumber: '',
    });
  };

  return (
    <div className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 text-base-content p-8 rounded-xl shadow-md w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Enroll New Student</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input name="name" value={student.name} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block mb-1">Age</label>
            <input name="age" value={student.age} onChange={handleChange} type="number" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input name="phone" value={student.phone} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input name="email" value={student.email} onChange={handleChange} type="email" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block mb-1">Gender</label>
            <select name="gender" value={student.gender} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Select</option>
              {genders.map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Roll Number</label>
            <input name="rollNumber" value={student.rollNumber} readOnly className="input input-bordered w-full bg-base-200" />
          </div>
          <div>
            <label className="block mb-1">Course</label>
            <select name="course" value={student.course} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Select</option>
              {courses.map(course => (
                <option key={course.code} value={course.label}>{course.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Department</label>
            <select name="department" value={student.department} onChange={handleChange} className="select select-bordered w-full" required>
              <option value="">Select</option>
              {departments.map(dept => (
                <option key={dept.code} value={dept.label}>{dept.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Start Year</label>
            <input name="startYear" value={student.startYear} onChange={handleChange} type="number" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="block mb-1">End Year</label>
            <input name="endYear" value={student.endYear} onChange={handleChange} type="number" className="input input-bordered w-full" required />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="submit" className="btn btn-primary px-6">Enroll</button>
        </div>
      </form>
    </div>
  );
};

export default ManageStudents;
