import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Error fetching tasks');
  }
};

export const createNewTask = async (taskData: { title: string, description: string, status: string, dueDate: string }) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        dueDate: new Date(taskData.dueDate),
      },
    });
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Error creating task');
  }
};

export const updateTaskById = async (
  id: number,
  data: { title: string, description: string, status: string, dueDate: string }
) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: new Date(data.dueDate),
      },
    });

    return updatedTask;
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw new Error('Error updating task');
  }
};

export const deleteTaskById = async (id: number) => {
  try {
    await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting task with id ${id}:`, error);
    throw new Error('Error deleting task');
  }
};

