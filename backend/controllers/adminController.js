import Admin from '../models/adminModel.js';
import Faculty from '../models/facultyModel.js';
import Student from '../models/studentModel.js';
import Subject from '../models/subjectModel.js';
import Department from '../models/departmentModel.js';
import Notice from '../models/noticeModel.js';
import TimeTable from '../models/timeTableModel.js';
import bcrypt from 'bcrypt';

export const createStudent = async (req, res) => {
     const data = req.body;

     try{
          const existingStudent = await Student.findOne({ email: data.email });
         if (existingStudent) { 
            return res.status(400).json({ message: 'Student with this email already exists' });
            }

         const hashedPassword = await bcrypt.hash(data.password, 10);
         data.password = hashedPassword;
            const student = new Student(
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    rollNumber: data.rollNumber,
                    class: data.class,
                    section: data.section,
                    role: 'Student',
                    gender: data.gender,
                    phone: data.phone,
                    age: data.age,
                    year: data.year,
                    course: data.course,
                    department: data.department,
                    batch: data.batch,
                    semester: data.semester,
                    subjects: data.subjects || [] // optional subjects array
                }
            );
            await student.save();
            res.status(201).json({ message: 'Student created successfully' });
     }
        catch (error) {
            console.error('Error creating student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };


export const createFaculty = async (req, res) => {
  const data = req.body;

  try {
    const existingFaculty = await Faculty.findOne({ email: data.email });
    if (existingFaculty) {
      return res.status(400).json({ message: 'Faculty with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    // Create new faculty
    const newFaculty = new Faculty({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      department: data.department,
      role: 'Faculty',
      subjects: data.subjects || [], // optional subjects array
    });

    const savedFaculty = await newFaculty.save();

    // If subjects are provided, update them to include this faculty
    if (data.subjects && Array.isArray(data.subjects)) {
      await Promise.all(
        data.subjects.map(async (subjectId) => {
          await Subject.findByIdAndUpdate(subjectId, {
            $addToSet: { faculty: savedFaculty._id }, // avoid duplicate entries
          });
        })
      );
    }

    res.status(201).json({ message: 'Faculty created successfully' });
  } catch (error) {
    console.error('Error creating faculty:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const createSubjects = async (req, res) => {
  const data = req.body;

  try {
    const existingSubject = await Subject.findOne({ code: data.code });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject with this code already exists' });
    }

    const subject = new Subject({
      name: data.name,
      code: data.code,
      credits: data.credits,
      department: data.department,
      year: data.year,
      semester: data.semester,
      faculty: data.faculty || [],
    });

    const savedSubject = await subject.save();

    // Optional: update each faculty's `subjects[]` array to include this subject
    if (data.faculty && Array.isArray(data.faculty)) {
      await Promise.all(
        data.faculty.map(async (facultyId) => {
          await Faculty.findByIdAndUpdate(facultyId, {
            $addToSet: { subjects: savedSubject._id },
          });
        })
      );
    }

    res.status(201).json({ message: 'Subject created successfully' });
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const updateSubjectsOfFaculty = async (req, res) => {
    const { subjectIds } = req.body;
    const { id: facultyId } = req.params;

    try {
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        const oldSubjectIds = faculty.subjects.map(id => id.toString());
        const newSubjectIds = subjectIds.map(id => id.toString());

        // Remove faculty from previously assigned subjects no longer selected
        const subjectsToRemove = await Subject.find({ _id: { $in: oldSubjectIds } });
        for (const subject of subjectsToRemove) {
            subject.faculty = subject.faculty.filter(fid => fid.toString() !== facultyId);
            await subject.save();
        }

        // Add faculty to new subjects
        const subjectsToAdd = await Subject.find({ _id: { $in: newSubjectIds } });
        for (const subject of subjectsToAdd) {
            if (!subject.faculty.map(fid => fid.toString()).includes(facultyId)) {
                subject.faculty.push(faculty._id);
                await subject.save();
            }
        }

        // Update faculty
        faculty.subjects = [...new Set(newSubjectIds)];
        await faculty.save();

        res.status(200).json({ message: 'Faculty subjects updated successfully' });
    } catch (error) {
        console.error('Error updating subjects for faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('subjects').select('-password');
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find().select('-password');
        res.status(200).json(faculty);
    } catch (error) {
        console.error('Error fetching faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('faculty', '-password');
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createDepartment = async (req, res) => {
    const data = req.body;

    try {
        const department = new Department({
            name: data.name,
            code: data.code,
            headOfDepartment: data.headOfDepartment,
        });
        await department.save();
        res.status(201).json({ message: 'Department created successfully' });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const sendNotification = async (req, res) => {
    const { title, content, noticeFor } = req.body;

    try {
        // Validate noticeFor
        if (!['Student', 'Faculty', 'All'].includes(noticeFor)) {
            return res.status(400).json({ message: 'Invalid recipient role' });
        }

        if(!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const notification = new Notice({
            title,
            content,
            noticeFor,
        });

        await notification.save();
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notice.find({ noticeFor: 'All' }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const createTimetable = async (req, res) => {
    const { subjectId, day, startTime, endTime, room } = req.body;

    try {
         const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const existingEntry = await TimeTable.findOne({
               day,
            startTime,
            endTime,
            room,
        });
        if (existingEntry) {
            return res.status(400).json({ message: 'Timetable entry already exists for this time slot' });
        }

        const timetableEntry = new TimeTable({
            subjectId,
            day,
            startTime,
            endTime,
            room
        });
        await timetableEntry.save();
        res.status(201).json({ message: 'Timetable entry created successfully' });
    } catch (error) {
        console.error('Error creating timetable entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteStudent = async (req, res) => {
    const { id: studentId } = req.params;

    try {
        const student = await Student.findByIdAndDelete(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteFaculty = async (req, res) => {
    const { id: facultyId } = req.params;

    try {
        const faculty = await Faculty.findByIdAndDelete(facultyId);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
          
        // Remove faculty from all subjects they were assigned to
        await Subject.updateMany(
            { faculty: facultyId },
            { $pull: { faculty: facultyId } }
        );

        res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        console.error('Error deleting faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteSubject = async (req, res) => {
    const { id: subjectId } = req.params;

    try {
        const subject = await Subject.findByIdAndDelete(subjectId);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        await Faculty.updateMany(
            { subjects: subjectId },
            { $pull: { subjects: subjectId } }
        );
        res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteDepartment = async (req, res) => {
    const { id: departmentId } = req.params;

    try {
        const department = await Department.findByIdAndDelete(departmentId);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteNotification = async (req, res) => {
    const { id: notificationId } = req.params;

    try {
        const notification = await Notice.findByIdAndDelete(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteTimetableEntry = async (req, res) => {
    const { id: timetableEntryId } = req.params;

    try {
        const timetableEntry = await TimeTable.findByIdAndDelete(timetableEntryId);
        if (!timetableEntry) {
            return res.status(404).json({ message: 'Timetable entry not found' });
        }
        res.status(200).json({ message: 'Timetable entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting timetable entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTimeTable = async (req, res) => {
    try {
        const timetable = await TimeTable.find().populate('subjectId', 'name code');
        res.status(200).json(timetable);
    } catch (error) {
        console.error('Error fetching timetable:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const updateStudentSubjects = async (req, res) => {
    const { subjectIds } = req.body;
    const { id: studentId } = req.params;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const oldSubjectIds = student.subjects.map(id => id.toString());
        const newSubjectIds = subjectIds.map(id => id.toString());

        const addedSubjects = newSubjectIds.filter(id => !oldSubjectIds.includes(id));
        const removedSubjects = oldSubjectIds.filter(id => !newSubjectIds.includes(id));

        await Student.findByIdAndUpdate(studentId, { subjects: subjectIds }, { new: true });

        res.status(200).json({
            message: 'Student subjects updated successfully',
            addedSubjects,
            removedSubjects
        });
    } catch (error) {
        console.error('Error updating student subjects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

