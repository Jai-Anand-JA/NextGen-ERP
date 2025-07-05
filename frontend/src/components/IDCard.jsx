import React from "react";

const IDCard = () => {
  const student = {
    name: "Jai Anand",
    rollNumber: "220100000",
    department: "CSE",
    course: "B.Tech Computer Science",
    year: "2022",
    validUpto: "2026",
    photoUrl: null // URL from details section
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-8">
      <div className="bg-base-100 border border-base-300 rounded-lg shadow-xl p-10 w-80 h-[600px] flex flex-col items-center relative">
        <h2 className="text-xl font-bold text-white mb-3">ID CARD</h2>

        <div className="w-24 h-24 rounded-full bg-base-300 mb-4 flex items-center justify-center overflow-hidden">

            <img 
              src="./Avatar.png" // Placeholder image, replace with student.photoUrl if available
              alt="Profile"
              className="w-full h-full object-cover"
            />
         
        </div>

        <div className="w-full border-t border-base-300 mb-2"></div>
        <h3 className="text-lg font-semibold text-white">{student.name}</h3>
        <div className="w-full border-t border-base-300 mt-2 mb-8"></div>

        <div className="space-y-5 w-full text-sm text-purple-400">
          <div>Roll Number: <span className="text-white">{student.rollNumber}</span></div>
          <div>Department: <span className="text-white">{student.department}</span></div>
          <div>Course: <span className="text-white">{student.course}</span></div>
          <div>Year: <span className="text-white">{student.year}</span></div>
          <div>Valid Upto: <span className="text-white">{student.validUpto}</span></div>
        </div>

        <div className="absolute bottom-6 right-6 flex flex-col items-end text-xs text-gray-400">
          <span className="italic text-blue-400">Signature</span>
          <span>Issuing Authority</span>
        </div>
      </div>
    </div>
  );
};

export default IDCard;
