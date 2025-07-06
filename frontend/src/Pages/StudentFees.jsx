import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { Loader } from "lucide-react";

function StudentFees() {
  const { getMyFees } = useAuthStore();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      const data = await getMyFees();
      setFees(data || []);
      setLoading(false);
    };

    fetchFees();
  }, []);

  const totalPaid = fees.reduce((sum, fee) => sum + (fee.status === "Paid" ? fee.paidAmount : 0), 0);
  const totalExpected = fees.reduce((sum, fee) => sum + fee.totalAmount, 0);
  const totalDue = totalExpected - totalPaid;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-base-content">My Fee Records</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-base-200 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-green-700">Total Paid</h2>
          <p className="text-xl font-bold mt-2">₹{totalPaid}</p>
        </div>
        <div className="bg-base-200 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-red-700">Total Due</h2>
          <p className="text-xl font-bold mt-2">₹{totalDue}</p>
        </div>
      </div>

      <div className="space-y-4">
        {fees.length > 0 ? (
          fees.map((fee) => (
            <div
              key={fee._id}
              className="bg-base-100 border border-base-300 p-4 rounded-lg shadow-sm"
            >
              <p className="text-base-content font-medium">
                <strong>Semester:</strong> {fee.semester}
              </p>
              <p className="text-base-content">
                <strong>Status:</strong>{" "}
                <span className={fee.status === "Paid" ? "text-green-600" : "text-red-600"}>
                  {fee.status}
                </span>
              </p>
              <p className="text-base-content">
                <strong>Amount:</strong> ₹{fee.totalAmount}
              </p>
              <p className="text-base-content">
                <strong>Paid:</strong> ₹{fee.paidAmount}
              </p>
              <p className="text-sm text-base-content/60">
                <strong>Date:</strong>{" "}
                {new Date(fee.paymentDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-base-content/70">No fee records found.</p>
        )}
      </div>
    </div>
  );
}

export default StudentFees;
