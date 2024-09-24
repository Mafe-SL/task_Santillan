import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/taskControl.js";


export const taskRouter = Router();

taskRouter.get('/tasks', getTasks);
taskRouter.get('/task/:id', getTask);
taskRouter.post('/tasks', createTask);
taskRouter.delete('/task/:id', deleteTask);
taskRouter.put('/task/:id', updateTask);