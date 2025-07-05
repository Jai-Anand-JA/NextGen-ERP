import express from 'express';
import {
  getStudentsBySubjectAndFaculty,
  markAttendance,
  getAttendanceSummary,
  getAttendanceByStudent,
  updateAttendance,
  assignGrade,
  updateGrade,
  getGradesBySubject,
  getGradesByStudent,
  getFacultyTimeTable,
  getNoticesForFaculty,
  getFacultySubjects
} from '../controllers/facultyController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(authMiddleware);

router.get('/subjects', getFacultySubjects); // Get all subjects for the logged-in faculty

router.get('/students/:id', getStudentsBySubjectAndFaculty); // id = subjectId


router.post('/attendance/mark', markAttendance);
router.get('/attendance/summary/:id', getAttendanceSummary); // id = subjectId
router.post('/attendance/student', getAttendanceByStudent);
router.put('/attendance/update', updateAttendance);


router.post('/grades/assign', assignGrade);
router.put('/grades/:id', updateGrade); // id = gradeId
router.get('/grades/subject/:id', getGradesBySubject); // id = subjectId
router.get('/grades/student/:id', getGradesByStudent); // id = studentId


router.get('/timetable', getFacultyTimeTable);


router.get('/notices', getNoticesForFaculty);

export default router;
