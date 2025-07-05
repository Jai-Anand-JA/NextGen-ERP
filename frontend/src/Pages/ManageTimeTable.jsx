import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';

const ManageTimetable = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const {
    subjects,
    timetable,
    getAllData,
    isLoading,
    getTimeTable,
  } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    selectedDays: [],
    startTime: '',
    endTime: '',
    roomNo: '',
    course: '',
  });

  useEffect(() => {
    getAllData();
    getTimeTable();
  }, []);

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const handleAddSlot = async () => {
    const { selectedDays, startTime, endTime, roomNo, course } = formData;

    if (!selectedDays.length || !startTime || !endTime || !roomNo || !course) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      for (const day of selectedDays) {
        const res = await axiosInstance.post('/api/admin/create-timetable', {
          subjectId: course,
          day,
          startTime,
          endTime,
          room: roomNo,
        });
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed to add slot');
        }
      }
      toast.success('Slot(s) added');
      setFormData({ selectedDays: [], startTime: '', endTime: '', roomNo: '', course: '' });
      setIsModalOpen(false);
      getTimeTable();
    } catch (err) {
      toast.error('Failed to add slot');
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/admin/delete-timetable/${id}`);
      if (res.status === 200 || res.status === 204) {
        toast.success('Slot removed');
        getTimeTable();
      } else {
        throw new Error('Failed to remove');
      }
    } catch (err) {
      toast.error('Failed to remove slot');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-base-content">Manage Timetable</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-focus transition"
        >
          + New Slot
        </button>
      </div>

      {/* Timetable Table */}
      {isLoading ? (
        <div className="text-center text-base-content/60 py-10">Loading timetable...</div>
      ) : timetable?.length > 0 ? (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left rounded">
            <thead className="bg-base-200 text-base-content font-semibold">
              <tr>
                <th className="px-5 py-3 border-b">Course</th>
                <th className="px-5 py-3 border-b">Day</th>
                <th className="px-5 py-3 border-b">Start</th>
                <th className="px-5 py-3 border-b">End</th>
                <th className="px-5 py-3 border-b">Room</th>
                <th className="px-5 py-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry) => (
                <tr key={entry._id} className="hover:bg-base-200 transition">
                  <td className="px-5 py-3">
                    {entry.subjectId?.code} - {entry.subjectId?.name}
                  </td>
                  <td className="px-5 py-3">{entry.day}</td>
                  <td className="px-5 py-3">{entry.startTime}</td>
                  <td className="px-5 py-3">{entry.endTime}</td>
                  <td className="px-5 py-3">{entry.room}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => handleRemove(entry._id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 text-base-content/50">No timetable entries found.</div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-xl shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold mb-4">Add New Timetable Slot</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Select Course</label>
                <select
                  className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                >
                  <option value="">-- Select Course --</option>
                  {(subjects || []).map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.code} - {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Days</label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-full border text-sm ${
                        formData.selectedDays.includes(day)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-base-200 border-base-300 text-base-content hover:bg-base-300'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Room No.</label>
                  <input
                    type="text"
                    placeholder="e.g., B-101"
                    value={formData.roomNo}
                    onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                    className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-base-300 text-base-content"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSlot}
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-focus transition"
                >
                  Save Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTimetable;
