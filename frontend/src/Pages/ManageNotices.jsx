import React, { useState } from 'react';

const ManageNotices = () => {
  const [notice, setNotice] = useState({
    title: '',
    body: '',
    audience: '',
  });

  const [sentNotices, setSentNotices] = useState([]);

  const handleSend = () => {
    const { title, body, audience } = notice;

    if (!title.trim() || !body.trim() || !audience) return;

    const newNotice = {
      ...notice,
      date: new Date().toLocaleString(),
    };

    setSentNotices([newNotice, ...sentNotices]);
    setNotice({ title: '', body: '', audience: '' });
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-semibold mb-10 text-base-content">Send Notice</h1>

      {/* Notice Form */}
      <div className="bg-base-100 p-8 rounded-2xl border border-base-300 shadow space-y-6 mb-12">
        <div>
          <label htmlFor="title" className="block font-medium mb-2">Notice Title</label>
          <input
            id="title"
            type="text"
            value={notice.title}
            onChange={(e) => setNotice({ ...notice, title: e.target.value })}
            className="w-full p-4 rounded-lg bg-base-200 border border-base-300 text-base-content"
            placeholder="Enter title..."
          />
        </div>

        <div>
          <label htmlFor="body" className="block font-medium mb-2">Notice Body</label>
          <textarea
            id="body"
            rows={6}
            value={notice.body}
            onChange={(e) => setNotice({ ...notice, body: e.target.value })}
            className="w-full p-4 rounded-lg bg-base-200 border border-base-300 text-base-content"
            placeholder="Write your message..."
          />
        </div>

        <div>
          <label htmlFor="audience" className="block font-medium mb-2">Send To</label>
          <select
            id="audience"
            value={notice.audience}
            onChange={(e) => setNotice({ ...notice, audience: e.target.value })}
            className="w-full p-4 rounded-lg bg-base-200 border border-base-300 text-base-content"
          >
            <option value="">-- Select Audience --</option>
            <option value="Students">Students</option>
            <option value="Faculties">Faculties</option>
            <option value="All">All</option>
          </select>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSend}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-focus transition text-sm"
          >
            📤 Send Notice
          </button>
        </div>
      </div>

      {/* Sent Notices */}
      {sentNotices.length > 0 && (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow overflow-hidden">
          <div className="text-xl font-semibold px-8 pt-8 pb-4">Sent Notices</div>
          <ul className="divide-y divide-base-300">
            {sentNotices.map((item, idx) => (
              <li key={idx} className="p-8 hover:bg-base-200 transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base-content font-medium text-lg">{item.title}</h3>
                  <span className="text-sm text-base-content/60">{item.date}</span>
                </div>
                <p className="text-base-content mb-3">{item.body}</p>
                <div className="text-sm text-base-content/60 italic">Audience: {item.audience}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageNotices;
