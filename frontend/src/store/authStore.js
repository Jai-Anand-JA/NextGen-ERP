import { create } from 'zustand';
import { axiosInstance } from '../lib/axiosInstance';

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  userrole: null,
  userId: null,
  isCheckingAuth: true,
  isSigningIn: false,
  sideBarOpen: false,

  userData: null,
  notices: null,
  subjects: null,
  students: null,
  faculties: null,
  timetable: null,
  attendance: null,
  departments: null,
  isLoading: true,

  setSidebarOpen: () => set({ sideBarOpen: !get().sideBarOpen }),

  getCurrentUser: async (email, password) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        set({
          isAuthenticated: true,
          userrole: response.data.user.role,
          userId: response.data.user.id,
        });
        console.log('User signed in:', response.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error?.response?.data?.message || error.message);
      set({
        isAuthenticated: false,
        userrole: null,
        userId: null,
      });
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.get('/api/auth/logout');
      if (response.data.success) {
        set({
          isAuthenticated: false,
          userrole: null,
          userId: null,
        });
        console.log('User logged out');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get('/api/auth/check-auth');
      if (response.status === 200) {
        set({
          isAuthenticated: true,
          userrole: response.data.user.role,
          userId: response.data.user.id,
        });
      } else {
        set({
          isAuthenticated: false,
          userrole: null,
          userId: null,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error?.response?.data?.message || error.message);
      set({
        isAuthenticated: false,
        userrole: null,
        userId: null,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  getUserData: async () => {
    try {
      const response = await axiosInstance.get('/api/auth/profile');
      if (response.status === 200) {
        set({ userData: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error.message);
      set({ userData: null });
    }
  },

  getAllData: async () => {
    set({ isLoading: true });
    try {
      const [studentsRes, facultiesRes, departmentsRes, subjectsRes] = await Promise.all([
        axiosInstance.get('/api/admin/get-students'),
        axiosInstance.get('/api/admin/get-faculty'),
        axiosInstance.get('/api/admin/get-departments'),
        axiosInstance.get('/api/admin/get-subjects'),
      ]);

      set({
        students: studentsRes.data || [],
        faculties: facultiesRes.data || [],
        departments: departmentsRes.data || [],
        subjects: subjectsRes.data || [],
      });
    } catch (error) {
      console.error('Data fetching error:', error.message);
      set({
        students: [],
        faculties: [],
        departments: [],
        subjects: [],
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getNotices: async () => {
    try {
      let res;
      const role = get().userrole;

      if (role === 'Admin') {
        res = await axiosInstance.get('/api/admin/get-notifications');
      } else if (role === 'Faculty') {
        res = await axiosInstance.get('/api/faculty/notices');
      } else if (role === 'Student') {
        res = await axiosInstance.get('/api/student/notices');
      }

      if (res?.status === 200) {
        set({ notices: res.data });
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error.message);
    }
  },

  getTimeTable : async ()=>{
    try{
        let res;
        const role = get().userrole;
        if(role === 'Admin'){
            res = await axiosInstance.get('/api/admin/timetable');
        } else if(role === 'Faculty'){
            res = await axiosInstance.get('/api/faculty/timetable');
        } else if(role === 'Student'){
            res = await axiosInstance.get('/api/student/timetable');
        }
        if(res?.status === 200){
            set({timetable: res.data});
        }

    }
    catch(error){
        console.error('Failed to fetch timetable:', error.message);
        set({timetable: null});
    }
  }
}));

export default useAuthStore;
