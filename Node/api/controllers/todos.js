import mongoose from 'mongoose';
import Todo from '../models/todo.js';

export const todos_create_todo = async (req, res, next) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      userId: req.userId
    };
    const todo = new Todo(data);
    await todo.save();

    await res.status(201).json({
      message: 'Todo created successfully',
      todo
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

export const todos_get_all = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.userId });

    if (todos.empty) {
      res.status(200).json({
        message: 'No Todos found',
        todos: []
      });
    } else {
      res.status(200).json({
        todos
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
};

export const todos_get_todo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const todo = doc(db, collectionName, todoId);
    const data = await getDoc(todo);
    if (data.exists()) {
      res.status(200).json({
        todo: {
          id: data.id,
          ...data.data()
        }
      });
    } else {
      res.status(404).json({
        message: 'Todo not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

export const todos_delete_todo = async (req, res, next) => {
  const { todoId } = req.params;
  try {
    const result = await Todo.findByIdAndDelete(todoId);
    if (!result) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res
      .status(200)
      .json({ message: 'Todo deleted successfully', todo: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const todos_update_todo = async (req, res, next) => {
  const { todoId } = req.params;
  const updates = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res
      .status(200)
      .json({ message: 'Todo updated successfully', todo: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const todos_completed_and_pending_todo = async (req, res, next) => {
  try {
    const result = await Todo.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(req.userId) } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log(error,"error")
    res.status(500).json({ error: error.message });
  }
};

// export const todos_users_with_highest_todo = async (req, res, next) => {
//   try {
//     const result = await Todo.aggregate([
//       { $group: { _id: '$userId', totalTodos: { $sum: 1 } } },
//       { $sort: { totalTodos: -1 } },
//       { $limit: 5 },
//       {
//         $lookup: {
//           from: 'users',
//           localField: '_id',
//           foreignField: '_id',
//           as: 'user'
//         }
//       },
//       { $unwind: '$user' },
//       {
//         $project: {
//           _id: 0,
//           name: '$user.name',
//           email: '$user.email',
//           totalTodos: 1
//         }
//       }
//     ]);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const todos_by_months = async (req, res, next) => {
//   try {
//     const result = await Todo.aggregate([
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             month: { $month: '$createdAt' }
//           },
//           totalTodos: { $sum: 1 }
//         }
//       },
//       { $sort: { '_id.year': 1, '_id.month': 1 } }
//     ]);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const todos_users_without_todos = async (req, res, next) => {
//   try {
//     const result = await User.aggregate([
//       {
//         $lookup: {
//           from: 'todos',
//           localField: '_id',
//           foreignField: 'userId',
//           as: 'todos'
//         }
//       },
//       { $match: { todos: { $size: 0 } } },
//       { $project: { name: 1, email: 1, age: 1 } }
//     ]);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
