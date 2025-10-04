import express from "express";
const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
    console.log('Login');
});

authRouter.post('/register', (req, res) => {
    console.log('Register');
});

export default authRouter;
