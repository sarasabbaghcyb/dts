import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all tasks
export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;  // Return the tasks fetched from the database
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Error fetching tasks');
  }
};

// Create a new task
export const createNewTask = async (taskData: { title: string, description: string, status: string, dueDate: string }) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        dueDate: new Date(taskData.dueDate),  // Convert dueDate to Date object
      },
    });
    return newTask;  // Return the newly created task
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Error creating task');
  }
};
