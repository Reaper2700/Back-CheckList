import { DataSource } from "typeorm";
import User from "../models/User";
import Task from "../models/task";

import UserMi1723571457496 from "./migrations/1723571457496-userMi";
import TaskBank1723652507594 from "./migrations/1723652507594-TaskBank";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'Check',
    password: 'docker',
    database: 'Check',
    entities: [User, Task],  // Inclua suas entidades aqui
    synchronize: true,
    logging: false,
    migrations: [],
});

AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!');
    console.log('Entities:', AppDataSource.entityMetadatas.map(metadata => metadata.name));
})
    .catch(err => {
        console.error('Error during Data Source initialization:', err);
    });