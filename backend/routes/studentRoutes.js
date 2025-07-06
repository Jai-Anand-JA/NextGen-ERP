import express from 'express';
import {
  getstudentSubjects,
  getStudentAttendanceSummary,
  getStudentAttendanceHistoryBySubject,
  getStudentGrades,
  getStudentTimeTable,
  getStudentNotices,
  getMyFees
} from '../controllers/studentController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);


router.get('/subjects', getstudentSubjects);

router.get('/attendance-summary', getStudentAttendanceSummary);

router.get('/attendance/:id', getStudentAttendanceHistoryBySubject); // id = subjectId


router.get('/grades', getStudentGrades);


router.get('/timetable', getStudentTimeTable);

router.get('/notices', getStudentNotices);
router.get('/my-fees',  getMyFees);

export default router;
