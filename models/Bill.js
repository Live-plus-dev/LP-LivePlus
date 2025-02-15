import mongoose from 'mongoose';

export const BillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  //userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
  timestamps: true
});

// Function to get or create the Bill model for a specific connection
export function getBillModel(connection) {
  // Check if the model is already registered to avoid recompilation
  return connection.models.Bill || connection.model('Bill', BillSchema);
}