import { getAllTasks, createNewTask, updateTaskById, deleteTaskById } from '../task-service';
import { prisma } from '../../db/client'; // Adjust this path as per your project structure
import { Task } from '@prisma/client';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      task: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    })),
  };
});

describe('Task Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears previous mocks before each test
  });

  describe('getAllTasks', () => {
    it('should return all tasks successfully', async () => {
      const tasks: Task[] = [{
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: 'in-progress',
        dueDate: new Date('2023-12-31'),
        createdAt: new Date(),
      }];

      // Mocking `findMany` to return tasks
      (prisma.task.findMany as jest.Mock).mockResolvedValue(tasks);

      const result = await getAllTasks();

      expect(result).toEqual(tasks); // Assert the result
      expect(prisma.task.findMany).toHaveBeenCalledTimes(1); // Ensure findMany was called once
    });

    it('should throw an error when fetching tasks fails', async () => {
      // Mocking rejection to simulate failure
      (prisma.task.findMany as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await expect(getAllTasks()).rejects.toThrow('Error fetching tasks');
    });
  });

  describe('createNewTask', () => {
    it('should create a new task successfully', async () => {
      const newTaskData = {
        title: 'New Task',
        description: 'New task description',
        status: 'open',
        dueDate: new Date('2023-12-31'),
      };

      const createdTask: Task = {
        ...newTaskData,
        id: 1,
        createdAt: new Date(),
      };

      // Mocking `create` to return created task
      (prisma.task.create as jest.Mock).mockResolvedValue(createdTask);

      const result = await createNewTask(newTaskData);

      expect(result).toEqual(createdTask); // Assert the result
      expect(prisma.task.create).toHaveBeenCalledTimes(1); // Ensure create was called once
    });

    it('should throw an error when creating a new task fails', async () => {
      const newTaskData = {
        title: 'New Task',
        description: 'New task description',
        status: 'open',
        dueDate: new Date('2023-12-31'),
      };

      // Mocking rejection to simulate failure
      (prisma.task.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await expect(createNewTask(newTaskData)).rejects.toThrow('Error creating task');
    });
  });

  describe('updateTaskById', () => {
    it('should update an existing task successfully', async () => {
      const updatedTaskData = {
        title: 'Updated Task',
        description: 'Updated task description',
        status: 'completed',
        dueDate: new Date('2023-12-31'),
      };

      const updatedTask: Task = {
        ...updatedTaskData,
        id: 1,
        createdAt: new Date(),
      };

      // Mocking `update` to return updated task
      (prisma.task.update as jest.Mock).mockResolvedValue(updatedTask);

      const result = await updateTaskById(1, updatedTaskData);

      expect(result).toEqual(updatedTask); // Assert the result
      expect(prisma.task.update).toHaveBeenCalledTimes(1); // Ensure update was called once
    });

    it('should throw an error when updating a task fails', async () => {
      const updatedTaskData = {
        title: 'Updated Task',
        description: 'Updated task description',
        status: 'completed',
        dueDate: new Date('2023-12-31'),
      };

      // Mocking rejection to simulate failure
      (prisma.task.update as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await expect(updateTaskById(1, updatedTaskData)).rejects.toThrow('Error updating task');
    });
  });

  describe('deleteTaskById', () => {
    it('should delete an existing task successfully', async () => {
      // Mocking `delete` to resolve successfully
      (prisma.task.delete as jest.Mock).mockResolvedValue(undefined);

      await expect(deleteTaskById(1)).resolves.toBeUndefined();
      expect(prisma.task.delete).toHaveBeenCalledTimes(1); // Ensure delete was called once
    });

    it('should throw an error when deleting a task fails', async () => {
      // Mocking rejection to simulate failure
      (prisma.task.delete as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

      await expect(deleteTaskById(1)).rejects.toThrow('Error deleting task');
    });
  });
});
