import React from 'react';

const NoticeBoard = ({ notices }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-3">Notices</h3>
      <div className="space-y-3">
        {notices.map((notice, index) => (
          <div key={index} className="flex items-start gap-2 border-b border-gray-700 pb-2">
            <span className="w-2 h-2 rounded-full bg-white mt-1"></span>
            <div>
              <p className="font-semibold text-white truncate">{notice.title}</p>
              <p className="text-sm text-gray-400 truncate">{notice.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
