import React, { useState } from 'react';

const ManageTimetable = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const courses = ['CSF307 - Technical Training', 'EC301 - Digital Systems', 'ME205 - Thermodynamics'];

  const [formData, setFormData] = useState({
    selectedDays: [],
    startTime: '',
    endTime: '',
    roomNo: '',
    course: '',
  });

  const [timetable, setTimetable] = useState([]);

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const handleAddSlot = () => {
    const { selectedDays, startTime, endTime, roomNo, course } = formData;
    if (!selectedDays.length || !startTime || !endTime || !roomNo || !course) return;

    const newEntries = selectedDays.map((day) => ({
      day,
      startTime,
      endTime,
      roomNo,
      course,
    }));

    setTimetable([...timetable, ...newEntries]);
    setFormData({ selectedDays: [], startTime: '', endTime: '', roomNo: '', course: '' });
  };

  const removeEntry = (index) => {
    const updated = [...timetable];
    updated.splice(index, 1);
    setTimetable(updated);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-base-content">Create Timetable</h1>

      {/* Form Card */}
      <div className="bg-base-100 p-8 rounded-2xl shadow border border-base-300 space-y-6 mb-10">
        {/* Select Course */}
        <div>
          <label className="block mb-2 font-medium">Select Course</label>
          <select
            className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Days Selection */}
        <div>
          <label className="block mb-2 font-medium">Days of the Week</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-4 py-1.5 rounded-full border text-sm ${
                  formData.selectedDays.includes(day)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-base-200 border-base-300 text-base-content hover:bg-base-300'
                } transition`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time & Room */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium">Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Room No.</label>
            <input
              type="text"
              placeholder="e.g., B-101"
              value={formData.roomNo}
              onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
              className="w-full p-3 rounded-lg bg-base-200 border border-base-300 text-base-content"
            />
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleAddSlot}
            className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-focus transition"
          >
            + Add Slot
          </button>
        </div>
      </div>

      {/* Timetable Display */}
      {timetable.length > 0 && (
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
              {timetable.map((entry, idx) => (
                <tr key={idx} className="hover:bg-base-200 transition">
                  <td className="px-5 py-3">{entry.course}</td>
                  <td className="px-5 py-3">{entry.day}</td>
                  <td className="px-5 py-3">{entry.startTime}</td>
                  <td className="px-5 py-3">{entry.endTime}</td>
                  <td className="px-5 py-3">{entry.roomNo}</td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => removeEntry(idx)}
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
      )}
    </div>
  );
};

export default ManageTimetable;
