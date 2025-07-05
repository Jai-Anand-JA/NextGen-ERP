import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  isAuthenticated: true,
  userrole: 'Admin',
  userId: null,
  isLoading: true,
  isSigningIn: false,
  sideBarOpen: false,

  // Fix: Toggle sidebar properly
  setSidebarOpen: () => set({ sideBarOpen: !get().sideBarOpen }),
}));

export default useAuthStore;
