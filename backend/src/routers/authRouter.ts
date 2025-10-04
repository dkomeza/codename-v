import { PrismaClient } from "@prisma/client";
import express from "express";
const authRouter = express.Router();
const prisma = new PrismaClient();


authRouter.post('/login', (req, res) => {
    console.log('Login');
});

authRouter.post('/register', async (req, res) => {
    try {
        const { name, surname, email, password, school, birthDate } = req.body;

        const user = await prisma.user.create({
            data: {
                name,
                surname,
                email,
                password: Bun.password.hashSync(password, {
                    algorithm: "bcrypt",
                    cost: 12
                }),
                school,
                birthDate
            },
        });
        
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

export default authRouter;
