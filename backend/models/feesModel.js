import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
        type: Number,
        default: 0
    },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Paid', 'Partial', 'Unpaid'],
    default: 'Unpaid'
  }
}, 
{
  timestamps: true
});

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;