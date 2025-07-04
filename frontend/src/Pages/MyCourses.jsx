import React from 'react';
import subjectsData from '../Dummydata'; // Adjust the path if needed

const MyCourses = () => {
    const [sideBarOpen, setSideBarOpen] = React.useState(true);
  return (
    <div className={`p-4 bg-gray-800 min-h-screen text-white ${sideBarOpen ? 'ml-56' : 'ml-20'}`}>
      <h2 className="text-xl font-bold mb-6 text-white">My Courses</h2>

      <div className="space-y-4">
        {subjectsData.map(subject => (
          <div key={subject._id} className="bg-gray-700 text-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Course Info */}
            <div>
              <h3 className="text-lg font-semibold">{subject.name} ({subject.code})</h3>
              <p className="text-sm text-gray-300 mt-1">
                Department: {subject.department} | Credits: {subject.credits}
              </p>
              <p className="text-sm text-gray-400">
                Year: {subject.year} | Semester: {subject.semester}
              </p>
            </div>

            {/* Faculty Info */}
            <div className="text-sm text-gray-300 md:text-right">
              <p className="font-medium text-white">Faculty:</p>
              <p>{subject.faculty.map(f => f.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { MyCourses };
