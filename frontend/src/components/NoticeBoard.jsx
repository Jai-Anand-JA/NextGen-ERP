import React from 'react';

const NoticeBoard = ({ notices }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-3">Notices</h3>
        <hr className="border-gray-300 mb-4" />
     {notices?.length > 0 ? (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow overflow-hidden">
          <ul className="divide-y divide-base-300">
            {notices.map((item, idx) => (
              <li key={idx} className="p-8 hover:bg-base-200 transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base-content font-medium text-lg">{item.title}</h3>
                  <span className="text-sm text-base-content/60">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-base-content mb-3">{item.content}</p>
                <div className="text-sm text-base-content/60 italic">
                  Audience: {item.noticeFor}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-10 text-base-content/50">No notices sent yet.</div>
      )}
     </div>
  );
};

export default NoticeBoard;
