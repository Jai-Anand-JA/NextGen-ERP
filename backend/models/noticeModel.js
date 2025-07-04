import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    noticeFor:{
        type: String,
        enum: ['Students', 'Faculty', 'All'],
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;