import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Student',
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    year: {
        type: String,
        required: true
    },
    course: {
        type: String,
    },
    department: {
        type: String,
    },
    batch: {
        type: String,
    },
    semester: {
        type: String,
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;