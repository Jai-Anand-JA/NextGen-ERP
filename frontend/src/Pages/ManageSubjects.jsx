import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { axiosInstance } from "../lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageSubjects = () => {
  const { departments, faculties, getAllData, sideBarOpen, subjects } =
    useAuthStore();

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    department: "",
    credits: "",
    year: "",
    semester: "",
    faculty: [],
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const handleAddCourse = async () => {
    const { code, name, department, credits, year, semester, faculty } = newCourse;

    if (!code || !name || !department || !credits || !year || !semester || faculty.length === 0) {
      toast.error("Please fill in all fields and select at least one faculty");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/admin/create-subject", newCourse);
      if (res.status === 200 || res.status === 201) {
        await getAllData();
        setShowModal(false);
        setNewCourse({
          code: "",
          name: "",
          department: "",
          credits: "",
          year: "",
          semester: "",
          faculty: [],
        });
        toast.success("Subject added successfully");
      }
    } catch (err) {
      console.error("Error adding course:", err.message);
      toast.error("Failed to add subject");
    }
  };

  const handleFacultySelect = (e) => {
    const id = e.target.value;
    const isChecked = e.target.checked;

    setNewCourse((prev) => ({
      ...prev,
      faculty: isChecked
        ? [...prev.faculty, id]
        : prev.faculty.filter((fid) => fid !== id),
    }));
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/delete-subject/${subjectId}`);
      if (res.status === 200) {
        await getAllData();
        toast.success("Subject deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete subject:", error);
      toast.error("Failed to delete subject");
    }
  };

  return (
    <div
      className={`p-6 bg-base-200 min-h-screen text-base-content transition-all duration-300 ${
        sideBarOpen ? "ml-36" : "ml-18"
      }`}
    >
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Manage Subjects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-2 rounded"
        >
          + Add Subject
        </button>
      </div>

      {/* Subject Cards */}
      <div className="space-y-4 px-4">
        {subjects?.map((subj, idx) => (
          <div
            key={idx}
            className="w-full bg-gray-800 text-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Subject Details */}
            <div>
              <h3 className="text-xl font-semibold">
                {subj.name}{" "}
                <span className="text-sm text-gray-400">({subj.code})</span>
              </h3>
              <div className="text-sm text-gray-300 mt-1 space-y-1">
                <p>Dept: {subj.department}</p>
                <p>Credits: {subj.credits}</p>
                <p>
                  Year: {subj.year} | Semester: {subj.semester}
                </p>
                <p>
                  Faculty:{" "}
                  {subj.faculty?.length > 0
                    ? subj.faculty.map((f) => f?.name).join(", ")
                    : "Unassigned"}
                </p>
              </div>
            </div>

            {/* Button Section */}
            <div className="flex gap-2 justify-start md:justify-end">
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
                onClick={() => handleDeleteSubject(subj._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md shadow-xl border border-base-300">
            <h2 className="text-xl font-bold mb-4">Add Subject</h2>

            <input
              type="text"
              placeholder="Code"
              className="input input-bordered w-full mb-2"
              value={newCourse.code}
              onChange={(e) =>
                setNewCourse({ ...newCourse, code: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full mb-2"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Credits"
              className="input input-bordered w-full mb-2"
              value={newCourse.credits}
              onChange={(e) =>
                setNewCourse({ ...newCourse, credits: e.target.value })
              }
            />

            <select
              className="input input-bordered w-full mb-2"
              value={newCourse.department}
              onChange={(e) =>
                setNewCourse({ ...newCourse, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              {departments?.map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              className="input input-bordered w-full mb-2"
              value={newCourse.year}
              onChange={(e) =>
                setNewCourse({ ...newCourse, year: e.target.value })
              }
            >
              <option value="">Select Year</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>

            <select
              className="input input-bordered w-full mb-2"
              value={newCourse.semester}
              onChange={(e) =>
                setNewCourse({ ...newCourse, semester: e.target.value })
              }
            >
              <option value="">Select Semester</option>
              <option value="odd">Odd</option>
              <option value="even">Even</option>
            </select>

            <div className="mb-4">
              <p className="font-semibold mb-1">Assign Faculty</p>
              {faculties?.map((fac) => (
                <label
                  key={fac._id}
                  className="flex items-center space-x-2 mb-1"
                >
                  <input
                    type="checkbox"
                    value={fac._id}
                    checked={newCourse.faculty.includes(fac._id)}
                    onChange={handleFacultySelect}
                  />
                  <span>{fac.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleAddCourse} className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubjects;
