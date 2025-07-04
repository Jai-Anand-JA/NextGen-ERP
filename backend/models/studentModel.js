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
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: String,
        required: true
    },
    section: {
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
    cgpa: {
        type: Number,
        default: 0.0,
        min: 0.0,
        max: 10.0
    },
    
});

const Student = mongoose.model('Student', studentSchema);

export default Student;