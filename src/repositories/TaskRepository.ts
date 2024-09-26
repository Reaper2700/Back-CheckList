import Task from "../models/task";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {

    // Método para encontrar tarefas por data de criação
    public async findByCreationDate(date: Date): Promise<Task[] | null> {
        const findTask = await this.find({
            where: { create_at: date },
        });

        return findTask.length > 0 ? findTask : null;
    }

    // Novo método para encontrar tarefas por ID do usuário
    public async findByUserId(userId: string): Promise<Task[] | null> {
        const tasks = await this.find({
            where: { provider_id: userId },
        });

        return tasks.length > 0 ? tasks : null;
    }
}

export default TaskRepository;

