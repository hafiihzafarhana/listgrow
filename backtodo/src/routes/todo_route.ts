import express, { Router } from 'express';
import TokenMiddleware from '../middlewares/token_middleware';
import { ToDoControllers } from '../controllers/todo_controller';

const router: Router = express.Router();
const tokenMiddleware = new TokenMiddleware();
const toDoControllers = new ToDoControllers();
export function todoRoutes(): Router {
  router.get('/todos', tokenMiddleware.authenticate, toDoControllers.getAllTodos);
  router.post('/todos', tokenMiddleware.authenticate, toDoControllers.createTodo);
  router.delete('/todos/:id/:image_secure_id', tokenMiddleware.authenticate, toDoControllers.deleteTodo);
  router.put('/todos/:id', tokenMiddleware.authenticate, toDoControllers.updateTodo);
  return router;
}
