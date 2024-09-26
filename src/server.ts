import express from 'express';
import typeorm from 'typeorm';
import { AppDataSource } from './database/data-source';
import userRouter from './routes/user.routes';
import taskRouter from './routes/taskRouter';

const app = express();
app.use(express.json());
app.use('/task', taskRouter);

app.use('/user', userRouter);


AppDataSource.initialize().then(() => {
    console.log("Database connection established");

    app.listen(3333, () => {
        console.log('Server started on port 3333!');
    });
}).catch(error => {
    console.error('Error during Data Source initialization:', error);
});