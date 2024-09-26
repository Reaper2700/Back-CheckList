import User from "../models/User";
import { AppDataSource } from "../database/data-source";
import { getRepository } from "typeorm";
import { response } from "express";

interface Request{
    name: string,
    email: string,
    password: string
}

class createUserService{
    public async execute({name, email, password}:Request): Promise<User>{
        const usersRepository = AppDataSource.getRepository(User);


        const CheckUserExist = await usersRepository.findOne({
            where: {email},
        });

        if(CheckUserExist){
            response.json({Error: "email já existe"});
        }

        const user = usersRepository.create({
            name,
            email,
            password
        });

        await usersRepository.save(user);

        return user;
    }
}

export default createUserService;