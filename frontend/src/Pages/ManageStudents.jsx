import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';

const genders = ['Male', 'Female', 'Other'];

const ManageStudents = () => {
  const { departments, subjects, students, getAllData } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSubjectModal, setEditSubjectModal] = useState({ open: false, studentId: null });
  const [studentCount, setStudentCount] = useState(1);
  const [student, setStudent] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    gender: '',
    subjects: [],
    department: '',
    startYear: '',
    endYear: '',
    rollNumber: '',
  });

  const [editSubjects, setEditSubjects] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (students?.length) setStudentCount(students.length + 1);
  }, [students]);

  useEffect(() => {
    if (student.subjects.length > 0 && student.department) {
      const serial = String(22010000 + studentCount);
      setStudent(prev => ({
        ...prev,
        rollNumber: `${serial}`,
      }));
    }
  }, [student.subjects, student.department, studentCount]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    setStudent(prev => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, value]
        : prev.subjects.filter(s => s !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedSubjectIds = subjects
      .filter(subject => student.subjects.includes(subject.name))
      .map(subject => subject._id);

    const payload = {
      name: student.name,
      email: student.email,
      password: 'student123',
      rollNumber: student.rollNumber,
      class: student.subjects[0],
      section: student.department,
      gender: student.gender,
      phone: student.phone,
      age: student.age,
      year: `${student.startYear}-${student.endYear}`,
      course: student.subjects[0],
      department: student.department,
      batch: `${student.startYear}-${student.endYear}`,
      semester: '1',
      subjects: selectedSubjectIds,
    };

    try {
      const res = await axiosInstance.post('/api/admin/create-student', payload);
      if (res.status === 200 || res.status === 201) {
        toast.success('Student enrolled successfully 🎉');
        setStudentCount(prev => prev + 1);
        setStudent({
          name: '',
          age: '',
          phone: '',
          email: '',
          gender: '',
          subjects: [],
          department: '',
          startYear: '',
          endYear: '',
          rollNumber: '',
        });
        setIsModalOpen(false);
        getAllData();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to enroll student');
    }
  };

  const deleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axiosInstance.delete(`/api/admin/delete-student/${studentId}`);
      toast.success('Student deleted');
      getAllData();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const openEditSubjects = (studentId, currentSubjects) => {
    setEditSubjectModal({ open: true, studentId });
    setEditSubjects(currentSubjects.map(s => s._id));
  };

  const handleEditSubjectChange = (e) => {
    const { value, checked } = e.target;
    setEditSubjects(prev =>
      checked ? [...prev, value] : prev.filter(id => id !== value)
    );
  };

  const saveEditedSubjects = async () => {
    try {
      await axiosInstance.put(`/api/admin/update-subjects/${editSubjectModal.studentId}`, {
        subjectIds: editSubjects,
      });
      toast.success('Subjects updated');
      setEditSubjectModal({ open: false, studentId: null });
      getAllData();
    } catch (err) {
      toast.error('Failed to update subjects');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Manage Students</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          + Enroll New Student
        </button>
      </div>

      {/* Students List */}
      {students?.length > 0 ? (
        <div className="bg-base-100 rounded-xl shadow border border-base-300">
          <div className="text-xl font-semibold px-6 py-4">Enrolled Students</div>
          <ul className="divide-y divide-base-300">
            {students.map((s) => (
              <li key={s._id} className="p-6 hover:bg-base-200 transition">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-lg">{s.name}</h3>
                  <span className="text-sm text-base-content/60">{s.rollNumber}</span>
                </div>
                <p className="text-sm">{s.email} | {s.phone}</p>
                <p className="text-sm text-base-content/60 italic">
                  Dept: {s.department} | Subjects: {s.subjects?.map(sub => sub.name).join(', ')}
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                    onClick={() => deleteStudent(s._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => openEditSubjects(s._id, s.subjects)}
                  >
                    Change Subjects
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-base-content/60 py-8">No students enrolled yet.</div>
      )}

      {/* Enroll Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-3xl shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold mb-4">Enroll New Student</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[['Name', 'name'], ['Age', 'age', 'number'], ['Phone', 'phone'], ['Email', 'email', 'email'], ['Start Year', 'startYear', 'number'], ['End Year', 'endYear', 'number']].map(([label, name, type = 'text']) => (
                <div key={name}>
                  <label className="block mb-1">{label}</label>
                  <input name={name} value={student[name]} onChange={handleChange} type={type} className="input input-bordered w-full" required />
                </div>
              ))}

              <div>
                <label className="block mb-1">Gender</label>
                <select name="gender" value={student.gender} onChange={handleChange} className="select select-bordered w-full" required>
                  <option value="">Select</option>
                  {genders.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="block mb-1">Roll Number</label>
                <input name="rollNumber" value={student.rollNumber} readOnly className="input input-bordered w-full bg-base-200" />
              </div>

              <div className="col-span-2">
                <label className="block mb-1">Subjects</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {subjects?.map(subject => (
                    <label key={subject._id} className="flex items-center gap-2">
                      <input type="checkbox" value={subject.name} checked={student.subjects.includes(subject.name)} onChange={handleSubjectChange} className="checkbox checkbox-sm" />
                      <span>{subject.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-1">Department</label>
                <select name="department" value={student.department} onChange={handleChange} className="select select-bordered w-full" required>
                  <option value="">Select</option>
                  {departments?.map(dept => (
                    <option key={dept._id || dept.code} value={dept.name || dept.label}>{dept.name || dept.label}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary px-6">Enroll</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subjects Modal */}
      {editSubjectModal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-xl shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold mb-4">Edit Subjects</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {subjects.map(subject => (
                <label key={subject._id} className="flex items-center gap-2">
                  <input type="checkbox" value={subject._id} checked={editSubjects.includes(subject._id)} onChange={handleEditSubjectChange} className="checkbox checkbox-sm" />
                  <span>{subject.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button className="btn btn-ghost" onClick={() => setEditSubjectModal({ open: false, studentId: null })}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEditedSubjects}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
