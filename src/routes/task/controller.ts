import { Request, Response } from "express";
import { getAllTasks, createNewTask, updateTaskById } from "../../services/task-service";

// Display all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();

    // Check if it's an AJAX/API request (Accepts JSON)
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

// Display the form to create a new task
export const createTaskPage = (_req: Request, res: Response) => {
  res.render('new-task');  // Render the new task form
};

// Handle task creation
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;

    // Create the new task using the task service
    const newTask = await createNewTask({ title, description, status, dueDate });
    console.log(newTask);

    res.status(200).send(newTask);
    // Redirect back to the home page with the new task added
    // res.redirect('/');  // This will trigger the GET / route to refresh the task list
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
    console.log(updatedTask);
    res.status(200).json(updatedTask); // Or redirect if desired
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Failed to update task");
  }
};
