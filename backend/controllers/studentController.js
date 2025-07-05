import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Grade from "../models/gradeModel.js";
import TimeTable from "../models/timeTableModel.js";
import Notice from "../models/noticeModel.js";




export const getstudentSubjects = async (req, res) => {
    const studentId = req.user.id; // Assuming user is set in authMiddleware

    try {
        // Find the student by ID
        const student = await Student.findById(studentId).populate('subjects');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student.subjects);
    } catch (error) {
        console.error('Error fetching student subjects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getStudentAttendanceSummary = async (req, res) => {
   const studentId = req.user.id; // Assuming user is set in authMiddleware
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const summary = await Attendance.aggregate([
      { $match: { studentId: new mongoose.Types.ObjectId(studentId) } },
      {
        $group: {
          _id: "$subjectId",
          totalClasses: { $sum: 1 },
          presents: {
            $sum: {
              $cond: [{ $eq: ["$status", "Present"] }, 1, 0]
            }
          }
        }
      },
      {
        $addFields: {
          attendancePercentage: {
            $round: [
              { $multiply: [{ $divide: ["$presents", "$totalClasses"] }, 100] },
              1
            ]
          }
        }
      },
      {
        $lookup: {
          from: "subjects",
          localField: "_id",
          foreignField: "_id",
          as: "subject"
        }
      },
      { $unwind: "$subject" },
      {
        $project: {
          _id: 0,
          subjectId: "$subject._id",
          subjectName: "$subject.name",
          code: "$subject.code",
          totalClasses: 1,
          presents: 1,
          attendancePercentage: 1
        }
      }
    ]);

    if (!summary.length) {
      return res.status(404).json({ message: 'No attendance records found for this student' });
    }

    // Calculate overall percentage
    const totalClassesOverall = summary.reduce((acc, cur) => acc + cur.totalClasses, 0);
    const totalPresentsOverall = summary.reduce((acc, cur) => acc + cur.presents, 0);

    const overallPercentage = totalClassesOverall === 0
      ? 0
      : Math.round((totalPresentsOverall / totalClassesOverall) * 1000) / 10; // 1 decimal place

    res.status(200).json({
      overallPercentage,
      summary
    });
  } catch (error) {
    console.error("Error fetching student attendance summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentAttendanceHistoryBySubject = async (req, res) => {
    const { id: subjectId } = req.params;
    const studentId = req.user.id; // Assuming user is set in authMiddleware

    try {
        if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(subjectId)) {
            return res.status(400).json({ message: 'Invalid student or subject ID' });
        }

        const attendanceHistory = await Attendance.find({
            studentId: new mongoose.Types.ObjectId(studentId),
            subjectId: new mongoose.Types.ObjectId(subjectId)
        }).sort({ date: -1 });

        if (!attendanceHistory.length) {
            return res.status(404).json({ message: 'No attendance records found for this student and subject' });
        }

        res.status(200).json(attendanceHistory);
    } catch (error) {
        console.error("Error fetching student attendance history:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getStudentGrades = async (req, res) => {
    const studentId = req.user.id; // Assuming user is set in authMiddleware

    try {
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        const grades = await Grade.find({ studentId: new mongoose.Types.ObjectId(studentId) })
            .populate('subjectId', 'name code');

        if (!grades.length) {
            return res.status(404).json({ message: 'No grades found for this student' });
        }

        res.status(200).json(grades);
    } catch (error) {
        console.error("Error fetching student grades:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getStudentTimeTable = async (req, res) => {
    const studentId = req.user.id; // Assuming user is set in authMiddleware

    try {
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        const timeTable = await TimeTable.findOne({ studentId: new mongoose.Types.ObjectId(studentId) });

        if (!timeTable) {
            return res.status(404).json({ message: 'Time table not found for this student' });
        }

        res.status(200).json(timeTable);
    } catch (error) {
        console.error("Error fetching student time table:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getStudentNotices = async (req, res) => {
    const studentId = req.user.id; // Assuming user is set in authMiddleware

    try {
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        const notices = await Notice.find({ audience: { $in: ['All', 'Students'] } })
            .sort({ createdAt: -1 });

        if (!notices.length) {
            return res.status(404).json({ message: 'No notices found' });
        }

        res.status(200).json(notices);
    } catch (error) {
        console.error("Error fetching student notices:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

