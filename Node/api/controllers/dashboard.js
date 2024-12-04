import mongoose from 'mongoose';
import Todo from '../models/todo.js';
import User from '../models/user.js';

export const todos_completed_and_pending_todo = async (req, res, next) => {
  try {
    const result = await Todo.aggregate([
      { $match: { userId: mongoose.Types.ObjectId.createFromHexString(req.userId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log(error,"error")
    res.status(500).json({ error: error.message });
  }
};

export const todos_users_with_highest_todo = async (req, res, next) => {
  try {
    const result = await Todo.aggregate([
      { $group: { _id: '$userId', totalTodos: { $sum: 1 } } },
      { $sort: { totalTodos: -1 } },
      { $limit: 2 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          name: '$user.name',
          email: '$user.email',
          totalTodos: 1
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const todos_by_months = async (req, res, next) => {
  try {
    const result = await Todo.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalTodos: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const todos_users_without_todos = async (req, res, next) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: 'todos',
          localField: '_id',
          foreignField: 'userId',
          as: 'todos'
        }
      },
      { $match: { todos: { $size: 0 } } },
      { $project: { name: 1, email: 1, age: 1 } }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};