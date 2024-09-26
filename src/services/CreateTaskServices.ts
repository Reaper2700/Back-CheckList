import { startOfHour } from "date-fns";
import { AppDataSource } from "../database/data-source";
import Task from "../models/task";

interface Request{
    provider_id:string,
    date: Date,
    description: string,
    status?: string
}

class CreateTaskService{
    public async execute({ date, provider_id, description, status = 'pending'}: Request): Promise<Task>{
        const taskRepository = AppDataSource.getRepository(Task);

        const TaskDate = startOfHour(date);
        const tasks = taskRepository.create({
            provider_id,
            create_at: TaskDate,
            description,
            status 
        });

        await taskRepository.save(tasks);

        return tasks;
    }
}

export default CreateTaskService;