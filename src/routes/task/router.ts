import express from "express";
import { getTasks, createTaskPage, createTask } from "./controller";

const taskRouter = express.Router();

// Route for displaying all tasks
taskRouter.get("/", getTasks);

// Route for displaying the form to create a new task
taskRouter.get("/new", createTaskPage);

// Route for handling the task creation form submission
taskRouter.post("/new", createTask);

export default taskRouter;
