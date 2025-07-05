import React from "react";


const Details = () => {
  const student = {
    name: "Jai Anand",
    age: 20,
    phone: "9876543210",
    email: "jai@example.com",
    gender: "Male",
    rollNumber: "220100000",
    course: "B.Tech Computer Science",
    department: "CSE",
    batch: "2022-2026",
    year: "2022"
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
      <div className="bg-base-100 border border-base-300 rounded-lg shadow-xl p-8 w-full max-w-6xl flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <img src="./Avatar.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {Object.entries(student).map(([key, value]) => (
            <div key={key} className="flex flex-col space-y-2">
              <label className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                value={value}
                disabled
                className="input input-bordered w-full bg-base-200 text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
