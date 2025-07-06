import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Grade from "../models/gradeModel.js";
import TimeTable from "../models/timeTableModel.js";
import Notice from "../models/noticeModel.js";
import mongoose from "mongoose";

export const getstudentSubjects = async (req, res) => {
  const studentId = req.user.id;

  try {
    const student = await Student.findById(studentId)
      .populate({
        path: 'subjects',
        populate: {
          path: 'faculty',
          model: 'Faculty', // this must match the model name you used for faculty
        }
      });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student.subjects);
  } catch (error) {
    console.error("Error fetching student subjects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getStudentAttendanceSummary = async (req, res) => {
  const studentId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const summary = await Attendance.aggregate([
      { $match: { studentId: new mongoose.Types.ObjectId(studentId) } },

      {
        $group: {
          _id: { subjectId: "$subjectId", facultyId: "$facultyId" },
          totalClasses: { $sum: 1 },
          presents: {
            $sum: {
              $cond: [{ $eq: ["$status", "Present"] }, 1, 0],
            },
          },
        },
      },

      {
        $addFields: {
          attendancePercentage: {
            $round: [
              { $multiply: [{ $divide: ["$presents", "$totalClasses"] }, 100] },
              1,
            ],
          },
        },
      },

      {
        $lookup: {
          from: "subjects",
          localField: "_id.subjectId",
          foreignField: "_id",
          as: "subject",
        },
      },
      { $unwind: "$subject" },

      {
        $lookup: {
          from: "faculties",
          localField: "_id.facultyId",
          foreignField: "_id",
          as: "faculty",
        },
      },
      { $unwind: "$faculty" },

      {
        $project: {
          _id: 0,
          subjectId: "$subject._id",
          subjectName: "$subject.name",
          code: "$subject.code",
          facultyName: "$faculty.name",
          totalClasses: 1,
          presents: 1,
          attendancePercentage: 1,
        },
      },
    ]);

    if (!summary.length) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this student" });
    }

    // Calculate overall percentage
    const totalClassesOverall = summary.reduce(
      (acc, cur) => acc + cur.totalClasses,
      0
    );
    const totalPresentsOverall = summary.reduce(
      (acc, cur) => acc + cur.presents,
      0
    );

    const overallPercentage =
      totalClassesOverall === 0
        ? 0
        : Math.round((totalPresentsOverall / totalClassesOverall) * 1000) / 10;

    res.status(200).json({
      overallPercentage,
      summary,
    });
  } catch (error) {
    console.error("Error fetching student attendance summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentAttendanceHistoryBySubject = async (req, res) => {
  const { id: subjectId } = req.params;
  const studentId = req.user.id;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(subjectId)
    ) {
      return res.status(400).json({ message: "Invalid student or subject ID" });
    }

    const attendanceHistory = await Attendance.find({
      studentId: new mongoose.Types.ObjectId(studentId),
      subjectId: new mongoose.Types.ObjectId(subjectId),
    })
      .populate("subjectId", "name code") // ✅ only select subject name and code
      .populate("facultyId", "name email") // ✅ only select faculty name and email
      .sort({ date: -1 });

    if (!attendanceHistory.length) {
      return res
        .status(404)
        .json({
          message: "No attendance records found for this student and subject",
        });
    }

    res.status(200).json(attendanceHistory);
  } catch (error) {
    console.error("Error fetching student attendance history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getStudentGrades = async (req, res) => {
  const studentId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const grades = await Grade.find({
      studentId: new mongoose.Types.ObjectId(studentId),
    }).populate("subjectId", "name code");

    if (!grades.length) {
      return res.status(404).json({ message: "No grades found for this student" });
    }

    // Grouping by subject
    const gradesBySubject = grades.map(grade => ({
      subjectCode: grade.subjectId.code,
      subjectName: grade.subjectId.name,
      grade: grade.grade
    }));

    res.status(200).json(gradesBySubject);
  } catch (error) {
    console.error("Error fetching student grades:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getStudentTimeTable = async (req, res) => {
  const studentId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const student = await Student.findById(studentId).populate('subjects');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const subjectIds = student.subjects.map((subj) => subj._id);

    const timeTableEntries = await TimeTable.find({ subjectId: { $in: subjectIds } })
      .populate('subjectId'); // optional: to get subject name/code

    if (!timeTableEntries.length) {
      return res.status(404).json({ message: 'No timetable found for your subjects' });
    }

    res.status(200).json(timeTableEntries);
  } catch (error) {
    console.error('Error fetching student timetable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStudentNotices = async (req, res) => {
  const studentId = req.user.id; // Assuming user is set in authMiddleware

  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const notices = await Notice.find({
      audience: { $in: ["All", "Students"] },
    }).sort({ createdAt: -1 });

    res.status(200).json(notices);
  } catch (error) {
    console.error("Error fetching student notices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
