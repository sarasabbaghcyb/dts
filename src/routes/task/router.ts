import express from "express";
import { getTasks, createTaskPage, createTask, updateTask, deleteTask } from "./controller";

const taskRouter = express.Router();

// Route for displaying all tasks
taskRouter.get("/", getTasks);

// Route for displaying the form to create a new task
taskRouter.get("/new", createTaskPage);

// Route for handling the task creation form submission
taskRouter.post("/", createTask);

taskRouter.put("/:id", updateTask);

taskRouter.delete("/:id", deleteTask);


export default taskRouter;
