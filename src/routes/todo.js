import express from "express";
import TodoController from "../controllers/todo";

const router = express.Router();

router.post("/todo", TodoController.addTodo);
router.get("/todos", TodoController.getAllTodos);
router.patch("/todo/:id", TodoController.updateTodo);
router.delete("/todo/:id", TodoController.deleteTodo);

export default router;
