import supertest from 'supertest';
import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, createTaskPage } from '../controller';
import * as taskService from '../../../services/task-service';

// Mock the service functions
jest.mock('../../../services/task-service');

const app = express();
app.use(express.json());

app.get('/tasks', getTasks);
app.get('/tasks/new', createTaskPage);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

describe('Task Controller', () => {
  describe('GET /tasks', () => {
    it('should return tasks as JSON when the accept header is application/json', async () => {
      const tasks = [{ id: 1, title: 'Test Task', description: 'Test Description', status: 'in-progress', dueDate: '2023-12-31' }];
      (taskService.getAllTasks as jest.Mock).mockResolvedValue(tasks);

      const response = await supertest(app)
        .get('/tasks')
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.tasks).toEqual(tasks);
    });

    it('should return a 500 status on error', async () => {
      (taskService.getAllTasks as jest.Mock).mockRejectedValue(new Error('Database error'));

      const response = await supertest(app).get('/tasks');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to fetch tasks');
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task and return it', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'in-progress',
        dueDate: '2023-12-31'
      };

      const createdTask = { ...newTask, id: 1 };
      (taskService.createNewTask as jest.Mock).mockResolvedValue(createdTask);

      const response = await supertest(app)
        .post('/tasks')
        .send(newTask);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(createdTask);
    });

    it('should return a 500 status on error', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'in-progress',
        dueDate: '2023-12-31'
      };

      (taskService.createNewTask as jest.Mock).mockRejectedValue(new Error('Failed to create task'));

      const response = await supertest(app)
        .post('/tasks')
        .send(newTask);

      expect(response.status).toBe(500);
      expect(response.text).toBe('Failed to create task');
    });
  });

  // Additional tests for PUT and DELETE would go here...
});
