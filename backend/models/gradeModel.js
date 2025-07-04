import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    grade: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'F']
    },
});

const Grade = mongoose.model('Grade', gradeSchema);
export default Grade;

