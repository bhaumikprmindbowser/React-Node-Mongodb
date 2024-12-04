import express from "express"
import {
  todos_completed_and_pending_todo,
  todos_users_with_highest_todo,
  todos_by_months,
  todos_users_without_todos
} from '../controllers/dashboard.js';
import {authMiddleware} from "../middleware/check-auth.js"

export const router = express.Router()

router.get("/status", authMiddleware, todos_completed_and_pending_todo)

router.get('/top-todo-users', authMiddleware, todos_users_with_highest_todo)

router.get('/todos-by-months', authMiddleware, todos_by_months)

router.get('/without-todo', authMiddleware, todos_users_without_todos)
