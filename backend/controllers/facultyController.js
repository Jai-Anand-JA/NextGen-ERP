
import Attendance from '../models/attendanceModel.js';
import Student from '../models/studentModel.js';
import Subject from '../models/subjectModel.js';
import Grade from '../models/gradeModel.js';
import TimeTable from '../models/timeTableModel.js';
import Faculty from '../models/facultyModel.js';
import Notice from '../models/noticeModel.js';

export const getFacultySubjects = async (req, res) => {
  const facultyId = req.user.id; // from auth middleware

  try {
    const subjects = await Subject.find({ faculty: { $in: [facultyId] } });

    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error fetching faculty subjects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getStudentsBySubjectAndFaculty = async (req, res) => {
  const {id: subjectId} = req.params;
    const facultyId = req.user.id; // assuming req.user is available from auth middleware

  try {
    if (!subjectId || !facultyId) {
      return res.status(400).json({ message: 'Subject ID and Faculty ID are required' });
    }

    // Validate: faculty must be assigned to this subject
    const subject = await Subject.findOne({
      _id: subjectId,
      faculty: { $in: [facultyId] }
    });

    if (!subject) {
      return res.status(403).json({ message: 'Faculty is not assigned to this subject' });
    }

    // Find students enrolled in that subject
    const students = await Student.find({ subjects: subjectId })
      .select('name email rollNumber department class section');

    if (!students.length) {
      return res.status(404).json({ message: 'No students found for this subject' });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students by subject and faculty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






export const markAttendance = async (req, res) => {
    const { studentIds, date, subjectId } = req.body;
    const facultyId = req.user.id; // assuming req.user is available from auth middleware

    try {
        if (!studentIds || !date || !subjectId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Step 1: Find all students enrolled in the subject
        const enrolledStudents = await Student.find({ subjects: subjectId }).select('_id');
        const allStudentIds = enrolledStudents.map(s => s._id.toString());

        const presentStudentIds = studentIds.map(id => id.toString());

        // Step 2: Separate Absent students
        const absentStudentIds = allStudentIds.filter(id => !presentStudentIds.includes(id));

        // Step 3: Create attendance records
        const attendanceRecords = [
            ...presentStudentIds.map(studentId => ({
                studentId,
                subjectId,
                facultyId,
                date,
                status: 'Present'
            })),
            ...absentStudentIds.map(studentId => ({
                studentId,
                subjectId,
                facultyId,
                date,
                status: 'Absent'
            }))
        ];

        // Optional: Avoid duplicate marking on the same day
        await Attendance.deleteMany({ subjectId, date: new Date(date) });

        // Step 4: Save all attendance records
        const attendance = await Attendance.insertMany(attendanceRecords);

        if (!attendance || attendance.length === 0) {
            return res.status(500).json({ message: "Failed to mark attendance" });
        }

        res.status(201).json({ message: "Attendance marked successfully", total: attendance.length });

    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAttendanceSummary = async (req, res) => {
    const { id: subjectId } = req.params;
    const facultyId = req.user.id;

    try {
        if (!subjectId) {
            return res.status(400).json({ message: "Subject ID is required" });
        }

        // Step 1: Aggregate attendance by student
        const summary = await Attendance.aggregate([
            {
                $match: {
                    subjectId: mongoose.Types.ObjectId(subjectId),
                    facultyId: mongoose.Types.ObjectId(facultyId)
                }
            },
            {
                $group: {
                    _id: "$studentId",
                    totalClasses: { $sum: 1 },
                    presents: {
                        $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] }
                    }
                }
            },
            {
                $addFields: {
                    attendancePercentage: {
                        $multiply: [
                            { $divide: ["$presents", "$totalClasses"] },
                            100
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "_id",
                    foreignField: "_id",
                    as: "student"
                }
            },
            {
                $unwind: "$student"
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$student._id",
                    name: "$student.name",
                    email: "$student.email",
                    totalClasses: 1,
                    presents: 1,
                    attendancePercentage: { $round: ["$attendancePercentage", 1] }
                }
            }
        ]);

        if (!summary.length) {
            return res.status(404).json({ message: "No attendance records found for this course" });
        }

        res.status(200).json(summary);

    } catch (error) {
        console.error("Error fetching attendance summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAttendanceByStudent = async (req, res) => {
  const { studentId, subjectId } = req.body;
  const facultyId = req.user.id;

  try {
    if (!studentId) {
      return res.status(400).json({ message: 'Student ID is required' });
    }

    // Step 1: Validate student exists and is enrolled
    const student = await Student.findById(studentId).select('name email rollNumber subjects');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!student.subjects || student.subjects.length === 0) {
      return res.status(404).json({ message: 'Student is not enrolled in any subjects' });
    }

    // Step 2: Build query
    const query = {
      studentId,
      facultyId,
      subjectId: subjectId || { $in: student.subjects }
    };

    // Step 3: Fetch attendance records
    const attendanceRecords = await Attendance.find(query)
      .populate('subjectId', 'name code credits')
      .populate('studentId', 'name email rollNumber')
      .sort({ date: -1 });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: 'No attendance records found for this student' });
    }

    // Step 4: Format response
    const response = attendanceRecords.map(record => ({
      id: record._id,
      subject: record.subjectId.name,
      subjectCode: record.subjectId.code,
      credits: record.subjectId.credits,
      date: record.date.toISOString().split('T')[0],
      status: record.status,
    }));

    res.status(200).json(response);

  } catch (error) {
    console.error('Error fetching attendance by student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAttendance = async (req, res) => {
  const { studentId, attendanceId, status } = req.body;
  const facultyId = req.user.id;
  try {
    if (!studentId || !attendanceId) {
      return res.status(400).json({ message: 'Student ID and Attendance ID are required' });
    }
    // Step 1: Validate attendance record exists
    const attendanceRecord = await Attendance.findById(attendanceId);
    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    // Step 2: Validate faculty authorization
    if (attendanceRecord.facultyId.toString() !== facultyId) {
      return res.status(403).json({ message: 'You are not authorized to update this attendance record' });
    }
    // Step 3: Validate student enrollment in subject
    const student = await Student.findById(studentId).select('subjects');
    if (!student || !student.subjects.includes(attendanceRecord.subjectId.toString())) {
        return res.status(404).json({ message: 'Student is not enrolled in the subject of this attendance record' });
    }
    // Step 4: Update attendance record
    attendanceRecord.status = status || attendanceRecord.status; // Allow status update
    await attendanceRecord.save();
    res.status(200).json({ message: 'Attendance record updated successfully' });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const assignGrade = async (req, res) => {
  const { studentId, subjectId, grade } = req.body;
  const facultyId = req.user.id;

  try {
    // Validate subject and faculty relationship
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    if (!subject.faculty.includes(facultyId)) {
      return res.status(403).json({ message: 'You are not authorized to assign grades for this subject' });
    }

    const existing = await Grade.findOne({ studentId, subjectId });
    if (existing) return res.status(409).json({ message: 'Grade already assigned. Use update instead.' });

    const newGrade = new Grade({ studentId, subjectId, facultyId, grade });
    await newGrade.save();

    res.status(201).json({ message: 'Grade assigned successfully'});
  } catch (error) {
    console.error('Error assigning grade:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /grades/:id
export const updateGrade = async (req, res) => {
  const gradeId = req.params.id;
  const facultyId = req.user.id;
  const { grade } = req.body;

  try {
    const existing = await Grade.findById(gradeId);
    if (!existing) return res.status(404).json({ message: 'Grade not found' });

    if (existing.facultyId.toString() !== facultyId) {
      return res.status(403).json({ message: 'You are not authorized to update this grade' });
    }

    existing.grade = grade;
    await existing.save();

    res.status(200).json({ message: 'Grade updated successfully', grade: existing });
  } catch (error) {
    console.error('Error updating grade:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /grades/:subjectId
export const getGradesBySubject = async (req, res) => {
  const facultyId = req.user.id;
  const { id:subjectId } = req.params;

  try {
    const grades = await Grade.find({ subjectId, facultyId })
      .populate('studentId', 'name email rollNumber')
      .populate('subjectId', 'name code credits');

    res.status(200).json(grades);
  } catch (error) {
    console.error('Error fetching grades:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /grades/student/:studentId
export const getGradesByStudent = async (req, res) => {
  const facultyId = req.user.id;
  const { id:studentId } = req.params;

  try {
    const grades = await Grade.find({ studentId, facultyId })
      .populate('subjectId', 'name code credits')
      .populate('studentId', 'name email rollNumber');

    res.status(200).json(grades);
  } catch (error) {
    console.error('Error fetching student grades:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFacultyTimeTable = async (req, res) => {
    const facultyId = req.user.id; // Assuming authentication middleware adds req.user

    try {
        const faculty = await Faculty.findById(facultyId).populate('subjects');
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        const subjectIds = faculty.subjects.map(subject => subject._id);

        const timetable = await TimeTable.find({ subjectId: { $in: subjectIds } })
            .populate('subjectId', 'name code') // Get subject details
            .sort({ day: 1, startTime: 1 }); // Optional sorting

        if (!timetable.length) {
            return res.status(404).json({ message: 'No timetable entries found for faculty' });
        }

        res.status(200).json(timetable);
    } catch (error) {
        console.error('Error fetching faculty timetable:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getNoticesForFaculty = async (req, res) => {
  try {
    const notices = await Notice.find({
      noticeFor: { $in: ['Faculty', 'All'] }
    }).sort({ createdAt: -1 }); // Latest first

    if (!notices.length) {
      return res.status(404).json({ message: 'No notices found for faculty' });
    }

    res.status(200).json(notices);
  } catch (error) {
    console.error('Error fetching notices for faculty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
