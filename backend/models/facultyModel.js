import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
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
        default: 'Faculty',
    },
    phone: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
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

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;