import bodyParser from "body-parser";
import express from "express";
// import { authenticate } from "../services/auth.service";
import { getChats, getUser, loadChat } from "@/controllers/chat.controller";
import { verifyToken } from "@/services/auth.service";
import jwt, { decode } from 'jsonwebtoken';

const chatRouter = express.Router();

chatRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

chatRouter.get("/chats", [verifyToken] ,async (req: any, res: any)=>{
	try{
		const authHeader = req.headers.authorization;

		let token = req.headers.authorization?.split(' ')[1];
    
		if (!token) {
			token = req.cookies?.token;
		}
		
		if (!token) {
			return res.status(401).json({ error: 'No token provided' });
    	}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string;

		const user = await getUser(decoded)

		//pobierz z bazki czaty
		const result = getChats(user)
		res.send(result)
	}catch (error: any) {
    	res.status(400).send({ error: error.message });
  	}
})

chatRouter.get("/loadChat", [verifyToken], async (req:any, res:any)=>{
	try{
		const chatId = req.body.chatId
		const messages = await loadChat(chatId)
		res.json(messages)
	}catch (error: any) {
    	res.status(400).send({ error: error.message });
  	}
})

export default chatRouter
