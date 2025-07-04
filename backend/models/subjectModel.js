import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true,
        min: 0
    },
    year: {
        type: String,
        required: true,
        enum: ['First', 'Second', 'Third', 'Fourth']
    },
    semester: {
        type: String,
        required: true,
        enum:['even', 'odd']
    },

    faculty:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    }],
    
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
