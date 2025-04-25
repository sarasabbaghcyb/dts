import { prisma } from '../db/client';
import { Task } from '@prisma/client'; // adjust path as needed

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    return await prisma.task.findMany();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error('Error fetching tasks');
  }
};

export const createNewTask = async (taskData: { title: string, description: string, status: string, dueDate: string }) => {
  try {
    return await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        dueDate: new Date(taskData.dueDate),
      },
    });
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
    return await prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: new Date(data.dueDate),
      },
    });
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
