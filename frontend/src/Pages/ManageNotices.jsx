import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { axiosInstance } from '../lib/axiosInstance';
import toast from 'react-hot-toast';

const ManageNotices = () => {
  const { notices, getNotices } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notice, setNotice] = useState({
    title: '',
    body: '',
    audience: '',
  });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    getNotices();
  }, []);

  const handleSend = async () => {
    const { title, body, audience } = notice;

    if (!title.trim() || !body.trim() || !audience) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      setIsSending(true);
      const res = await axiosInstance.post('/api/admin/send-notification', {
        title,
        content: body,
        noticeFor: audience,
      });

      if (res.status === 200) {
        await getNotices();
        setNotice({ title: '', body: '', audience: '' });
        setIsModalOpen(false);
        toast.success('Notice sent successfully 🎉');
      }
    } catch (err) {
      toast.error('Failed to send notice');
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (noticeId) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/delete-notification/${noticeId}`);
      if (res.status === 200) {
        toast.success('Notice deleted successfully 🗑️');
        getNotices();
      }
    } catch (err) {
      toast.error('Failed to delete notice');
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold text-base-content">Manage Notices</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-focus transition"
        >
          + New Notice
        </button>
      </div>

      {/* Sent Notices */}
      {notices?.length > 0 ? (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow overflow-hidden">
          <div className="text-xl font-semibold px-8 pt-8 pb-4">Sent Notices</div>
          <ul className="divide-y divide-base-300">
            {notices.map((item, idx) => (
              <li key={idx} className="p-8 hover:bg-base-200 transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base-content font-medium text-lg">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-base-content/60">
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
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

      {/* Modal for New Notice */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-xl shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold mb-4">Send New Notice</h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="block font-medium mb-1">
                  Notice Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={notice.title}
                  onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                  className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
                  placeholder="Enter title..."
                />
              </div>

              <div>
                <label htmlFor="body" className="block font-medium mb-1">
                  Notice Body
                </label>
                <textarea
                  id="body"
                  rows={5}
                  value={notice.body}
                  onChange={(e) => setNotice({ ...notice, body: e.target.value })}
                  className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
                  placeholder="Write your message..."
                />
              </div>

              <div>
                <label htmlFor="audience" className="block font-medium mb-1">
                  Send To
                </label>
                <select
                  id="audience"
                  value={notice.audience}
                  onChange={(e) => setNotice({ ...notice, audience: e.target.value })}
                  className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
                >
                  <option value="">-- Select Audience --</option>
                  <option value="Student">Students</option>
                  <option value="Faculty">Faculties</option>
                  <option value="All">All</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-base-300 text-base-content"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-focus transition"
                  disabled={isSending}
                >
                  {isSending ? 'Sending...' : '📤 Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotices;
