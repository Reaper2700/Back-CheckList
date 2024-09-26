import { Request, Response, Router } from "express";
import User from "../models/User"
import createUserService from "../services/CreateUserServices";

const userRouter = Router();

userRouter.post('/', async (request: Request, response: Response) => {
        try {
                const { name, email, password } = request.body;
                const createUser = new createUserService();

                const user = await createUser.execute({
                        name,
                        email,
                        password
                });

                return response.json(user);
        } catch (err) {
                if (err instanceof Error) {
                        console.error('Error creating appointment:', err.message);
                        return response.status(400).json({ error: 'Error creating appointment', details: err.message });
                } else {
                        console.error('Unexpected error:', err);
                        return response.status(500).json({ error: 'Unexpected error occurred' });
                }
        }
});

export default userRouter;