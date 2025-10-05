import bodyParser from "body-parser";
import express from "express";
// import { authenticate } from "../services/auth.service";
import { getChatByUsersId, getChats, getUser, loadChat } from "@/controllers/chat.controller";
import jwt, { decode, type JwtPayload } from 'jsonwebtoken';
import { authenticate } from "@/middleware/auth.middleware";
import { LoginSchema, SignUpSchema } from "@shared/schemas/auth.schema";

const chatRouter = express.Router();

chatRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

chatRouter.get("/chats", [authenticate] ,async (req: any, res: any)=>{
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

chatRouter.post("/loadChat", [authenticate], async (req:any, res:any)=>{
	try{
		
		let token = req.headers.authorization?.split(' ')[1];
		
    
		if (!token) {
			token = req.cookies?.token;
		}
		
		if (!token) {
			return res.status(401).json({ error: 'No token provided' });
    	}


		const user1 = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
		const user1Id = user1.id
		
		
		const user2Id = req.body.reciverId
		
		const chat = await getChatByUsersId(user1Id, user1Id)
		
		if (chat){
			const chatId = chat.id
			const messages = await loadChat(chatId)
			res.json(messages)
		}else{
			res.json([])
		}
	}catch (error: any) {
    	res.status(400).send({ error: error.message });
  	}
})

export default chatRouter
