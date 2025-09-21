import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  itemName: { type: String, required: true },
  itemAmount: { type: Number, required: true },
  category: { type: String, enum: ['income', 'expense'], required: true },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
