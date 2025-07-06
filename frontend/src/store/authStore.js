import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

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
  grades: null,

  setSidebarOpen: () => set({ sideBarOpen: !get().sideBarOpen }),

  getCurrentUser: async (email, password) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        set({
          isAuthenticated: true,
          userrole: response.data.user.role,
          userId: response.data.user.id,
        });
        console.log("User signed in:", response.data.user);
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error?.response?.data?.message || error.message
      );

      // Show toast error for bad credentials
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );

      // Reset only auth-related values but don’t activate loader again
      set({
        isAuthenticated: false,
        userrole: null,
        userId: null,
        userData: null,
      });
    } finally {
      set({ isSigningIn: false }); // turn off loader either way
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      if (response.data.success) {
        set({
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
          grades: null,
        });
        console.log("User logged out");
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/api/auth/check-auth");
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
      console.error(
        "Auth check failed:",
        error?.response?.data?.message || error.message
      );
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
      const response = await axiosInstance.get("/api/auth/profile");
      if (response.status === 200) {
        set({ userData: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
      set({ userData: null });
    }
  },

  getAllData: async () => {
    set({ isLoading: true });
    try {
      const [studentsRes, facultiesRes, departmentsRes, subjectsRes] =
        await Promise.all([
          axiosInstance.get("/api/admin/get-students"),
          axiosInstance.get("/api/admin/get-faculty"),
          axiosInstance.get("/api/admin/get-departments"),
          axiosInstance.get("/api/admin/get-subjects"),
        ]);

      set({
        students: studentsRes.data || [],
        faculties: facultiesRes.data || [],
        departments: departmentsRes.data || [],
        subjects: subjectsRes.data || [],
      });
    } catch (error) {
      console.error("Data fetching error:", error.message);
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

      if (role === "Admin") {
        res = await axiosInstance.get("/api/admin/get-notifications");
      } else if (role === "Faculty") {
        res = await axiosInstance.get("/api/faculty/notices");
      } else if (role === "Student") {
        res = await axiosInstance.get("/api/student/notices");
      }

      if (res?.status === 200) {
        set({ notices: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch notices:", error.message);
    }
  },

  getTimeTable: async () => {
    try {
      let res;
      const role = get().userrole;
      if (role === "Admin") {
        res = await axiosInstance.get("/api/admin/timetable");
      } else if (role === "Faculty") {
        res = await axiosInstance.get("/api/faculty/timetable");
      } else if (role === "Student") {
        res = await axiosInstance.get("/api/student/timetable");
      }
      if (res?.status === 200) {
        set({ timetable: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch timetable:", error.message);
      set({ timetable: null });
    }
  },
  getFacultySubjects: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/faculty/subjects");
      if (res.status === 200) {
        set({ subjects: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch faculty subjects:", error.message);
      toast.error("Failed to load subjects");
    } finally {
      set({ isLoading: false });
    }
  },

  getStudentsBySubject: async (subjectId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/api/faculty/students/${subjectId}`);
      if (res.status === 200) {
        set({ students: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch students by subject:", error.message);
      toast.error("Failed to load students");
      set({ students: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  markAttendance: async ({ subjectId, date, attendanceData }) => {
    try {
      const res = await axiosInstance.post("/api/faculty/attendance/mark", {
        subjectId,
        date,
        attendanceData,
      });

      if (res.status === 200) {
        toast.success("Attendance submitted successfully.");
      } else {
        toast.error("Failed to mark attendance.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error.message);
      toast.error("Failed to submit attendance.");
    }
  },

  getFacultyTimetable: async () => {
    try {
      const res = await axiosInstance.get("/api/faculty/timetable");
      if (res.status === 200) {
        set({ timetable: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch faculty timetable:", error.message);
      toast.error("Failed to load timetable");
      set({ timetable: [] });
    }
  },
  getStudentAttendanceSummary: async () => {
    try {
      const res = await axiosInstance.get("/api/student/attendance-summary");
      if (res.status === 200) {
        set({
          attendance: res.data.summary,
          overallPercentage: res.data.overallPercentage,
        });
      }
    } catch (error) {
      console.error(
        "Error fetching student attendance summary:",
        error.message
      );
      toast.error("Failed to fetch attendance summary");
      set({ attendance: [], overallPercentage: 0 });
    }
  },
  attendanceHistory: [],
  getStudentAttendanceHistory: async (subjectId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(
        `/api/student/attendance/${subjectId}`
      );
      if (res.status === 200) {
        set({ attendanceHistory: res.data });
      }
    } catch (error) {
      console.error("Error fetching attendance history:", error.message);
      toast.error("Failed to fetch attendance history");
      set({ attendanceHistory: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  getStudentTimeTable: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/student/timetable");
      if (res.status === 200) {
        set({ timetable: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch student timetable:", error.message);
      toast.error("Failed to load student timetable");
      set({ timetable: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  getCourses: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/student/subjects");
      if (res.status === 200) {
        set({ subjects: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch student courses:", error.message);
      toast.error("Failed to load courses");
      set({ subjects: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  getGrades: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/student/grades");
      if (res.status === 200) {
        set({ grades: res.data });
      }
    } catch (error) {
      console.error("Failed to fetch grades:", error.message);
      toast.error("Failed to load grades");
      set({ grades: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
