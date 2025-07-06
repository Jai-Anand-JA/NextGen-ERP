import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { axiosInstance } from "../lib/axiosInstance";
import { toast } from "react-hot-toast";
import { Loader, User } from "lucide-react";

function ManageFees() {
  const { students, getAllData, sideBarOpen, isLoading, getStudentFee } = useAuthStore();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState({ semester: "", totalAmount: "" });
  const [feeData, setFeeData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAllData();
  }, []);

  const loadFeeData = async (student) => {
    setSelectedStudent(student);
    const fee = await getStudentFee(student._id);
    if (fee) {
      setFeeData(fee);
      setForm({ semester: fee.semester, totalAmount: fee.totalAmount });
      setIsEditing(false);
    } else {
      setFeeData(null);
      setForm({ semester: "", totalAmount: "" });
      setIsEditing(true); // If no data, directly open form
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.semester || !form.totalAmount) {
      return toast.error("All fields are required");
    }

    try {
      setSubmitting(true);

      const endpoint = feeData
        ? `/api/admin/update-fee/${selectedStudent._id}`
        : "/api/admin/create-fee";

      const method = feeData ? "put" : "post";

      const payload = {
        studentId: selectedStudent._id,
        semester: form.semester,
        totalAmount: Number(form.totalAmount),
      };

      const res = await axiosInstance[method](endpoint, payload);

      if (res.status === 200 || res.status === 201) {
        toast.success(feeData ? "Fee record updated" : "Fee record created");
        setSelectedStudent(null);
        setForm({ semester: "", totalAmount: "" });
        setIsEditing(false);
        setFeeData(null);
      }
    } catch (error) {
      console.error("Fee submission failed:", error.message);
      toast.error("Failed to submit fee record");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className={`mx-auto p-6 ${sideBarOpen ? "ml-56" : "ml-20"} transition-all duration-300`}>
      <h1 className="text-2xl font-semibold mb-6 text-base-content">
        {selectedStudent
          ? `${feeData ? (isEditing ? "Update" : "View") : "Assign"} Fee for ${selectedStudent.name}`
          : "Manage Student Fees"}
      </h1>

      {selectedStudent && (
        <button
          onClick={() => {
            setSelectedStudent(null);
            setFeeData(null);
            setIsEditing(false);
            setForm({ semester: "", totalAmount: "" });
          }}
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 font-medium px-3 py-1.5 rounded-md border border-blue-200 bg-blue-50 hover:bg-blue-100 transition"
        >
          ← Back to Student List
        </button>
      )}

      {/* === Fee Form or Card === */}
      {selectedStudent ? (
        !isEditing && feeData ? (
          <div className="bg-base-100 border border-base-300 shadow rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Fee Details</h2>
            <p className="mb-2"><strong>Semester:</strong> {feeData.semester}</p>
            <p className="mb-4"><strong>Total Amount:</strong> ₹{feeData.totalAmount}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
              >
                Update Fees
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-base-100 border border-base-300 shadow rounded-lg p-6 max-w-md">
            <div className="mb-4">
              <label className="block font-medium mb-1">Semester</label>
              <input
                type="text"
                name="semester"
                value={form.semester}
                onChange={handleInputChange}
                className="w-full p-2 border border-base-300 rounded"
                placeholder="e.g. 5th"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={form.totalAmount}
                onChange={handleInputChange}
                className="w-full p-2 border border-base-300 rounded"
                placeholder="e.g. 50000"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-60"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : feeData
                ? "Update Fee Record"
                : "Create Fee Record"}
            </button>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students?.length > 0 ? (
            students.map((student) => (
              <div
                key={student._id}
                className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-base-content/70" />
                  <h2 className="text-lg font-medium text-base-content">
                    {student.name}
                  </h2>
                </div>
                <p className="text-sm text-base-content/70 mb-1">
                  Email: {student.email}
                </p>
                <p className="text-sm text-base-content/70 mb-1">
                  Roll No: {student.rollNumber}
                </p>
                <p className="text-sm text-base-content/70 mb-1">
                  Department: {student.department}
                </p>
                <button
                  onClick={() => loadFeeData(student)}
                  className="mt-2 text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Manage Fees
                </button>
              </div>
            ))
          ) : (
            <div className="text-base-content/70 col-span-full text-center">
              No students found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageFees;
