import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    headOfDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
