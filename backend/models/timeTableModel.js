import mongoose from 'mongoose';

const timeTableSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);

export default TimeTable;
