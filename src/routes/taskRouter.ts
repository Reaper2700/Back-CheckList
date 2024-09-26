import express, { Response, Request, Router, request } from "express";
import { AppDataSource } from "../database/data-source";
import { parseISO } from "date-fns";
import CreateTaskService from "../services/CreateTaskServices";
import Task from "../models/task";

const taskRouter = Router();

taskRouter.use(express.json());

// Endpoint para obter todas as tarefas
taskRouter.get('/', async (request: Request, response: Response) => {
    const taskRepository = AppDataSource.getRepository(Task);

    try {
        const tasks = await taskRepository.find();
        return response.json(tasks);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error retrieving tasks:', err.message);
            return response.status(500).json({ error: 'Error retrieving tasks', details: err.message });
        } else {
            console.error('An unexpected error occurred:', err);
            return response.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

taskRouter.get('/:id',async (request: Request, response: Response) => {
    const taskRepository = AppDataSource.getRepository(Task);
    try{
        const { id } = request.params;
        
        if(!id || typeof id !== 'string'){
            return response.status(400).json({ error: 'Provider ID is required' });
        }
        
        const tasks = await taskRepository.find({ where: {provider_id: id}});

        return response.status(200).json(tasks)
    }catch(err){
        console.error(err);
    return response.status(500).json({ message: 'Erro ao buscar tarefas.' });
  }
})

// Endpoint para criar uma nova tarefa
taskRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { provider_id, date, description } = request.body; // Corrigido de 'text' para 'description'
        const parsedDate = parseISO(date);

        const createTaskService = new CreateTaskService();

        const task = await createTaskService.execute({ date: parsedDate, provider_id, description });

        return response.json({ task });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error creating task:', err.message); // Corrigido de 'appointment' para 'task'
            return response.status(400).json({ error: 'Error creating task', details: err.message });
        } else {
            console.error('Unexpected error:', err);
            return response.status(500).json({ error: 'Unexpected error occurred' });
        }
    }
});


export default taskRouter;
