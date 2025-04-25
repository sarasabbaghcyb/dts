import { Request, Response } from "express";
import { getAllTasks, createNewTask, updateTaskById, deleteTaskById } from "../../services/task-service";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    if (req.headers.accept?.includes('application/json')) {
      res.json({ tasks });
    } else {
      res.render('home', { tasks });
    }
  } catch (error) {
    console.error("Error in getTasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTaskPage = (_req: Request, res: Response) => {
  res.render('new-task');
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const newTask = await createNewTask({ title, description, status, dueDate });
    res.status(200).send(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send("Failed to create task");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  const { title, description, status, dueDate } = req.body;

  try {
    const updatedTask = await updateTaskById(taskId, { title, description, status, dueDate });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Failed to update task");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);
  try {
    await deleteTaskById(taskId);
    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Failed to delete task");
  }
};
