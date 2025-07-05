import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axiosInstance';
import useAuthStore from '../store/authStore';

const CreateFaculty = ({ onSuccess, onCancel }) => {
  const { departments, getAllData, addFaculty } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllData(); // Ensure departments are fetched
  }, [getAllData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/api/admin/create-faculty', formData);
      if (response.status === 201 || response.status === 200) {
        addFaculty?.(response.data?.faculty); // Optional: Add to Zustand store if needed
        onSuccess?.(); // Trigger modal close or reload
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow border border-base-300 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-base-content">Create New Faculty</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        >
          <option value="">Select Department</option>
          {departments?.map((dept) => (
            <option key={dept._id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFaculty;
