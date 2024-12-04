import express from "express"
import {
  todos_get_all,
  todos_create_todo,
  todos_get_todo,
  todos_delete_todo,
  todos_update_todo,
  todos_completed_and_pending_todo
} from "../controllers/todos.js"
import {authMiddleware} from "../middleware/check-auth.js"

export const router = express.Router()

router.get("/", authMiddleware, todos_get_all)

router.post("/", authMiddleware, todos_create_todo)

router.get("/:todoId", authMiddleware, todos_get_todo)

router.delete("/:todoId", authMiddleware, todos_delete_todo)

router.put("/:todoId", authMiddleware, todos_update_todo)

router.get("/status", authMiddleware, todos_completed_and_pending_todo)

// router.get('/top-todo-users', authMiddleware, todos_users_with_highest_todo)

// router.get('/todos-by-months', authMiddleware, todos_by_months)

// router.get('/without-todo', authMiddleware, todos_users_without_todos)
