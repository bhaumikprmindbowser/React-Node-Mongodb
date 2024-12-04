import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;