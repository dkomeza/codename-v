import { createChat, createMessage, getChatByUsersId } from '@/controllers/chat.controller';
import type { Message } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import jwt, { decode } from 'jsonwebtoken';


type message = {
	senderId: string,
	reciverId: string,
	message: string
}

const userMap: Map<string, string> = new Map();

export const handleSocketIo = (socket: Socket)=>{
	console.log("connected");
	// console.log(socket);
	
	const token = socket.handshake.auth.token;
  
	if (!token) {
		socket.emit("message", "No token :(")
		return
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string;

	if (typeof decode != "string") {
		socket.emit("message", "Something went wrong")
		return
	}

	userMap.set(decode, socket.id)
	

	socket.on("message", async (message: string)=>{
		console.log(message);

		const data = JSON.parse(message) as message


		const user1Id = data.senderId
		const user2Id = data.reciverId

		let chat = await getChatByUsersId(user1Id, user2Id)

		if (chat == null){
			chat = await createChat(user1Id, user2Id)
		}

		const chatId = chat.id

		const response = {
			senderUserId: user1Id,
			chatId: chatId,
			message: data.message,
			messageTime: Date.now()
		}

		createMessage(response)

		const user2Socket = userMap.get(user2Id)

		if (typeof user2Socket == "string"){
			socket.to(user2Socket).emit("message", message)
		}
		
	})

	socket.on("disconnect", ()=>{
		userMap.delete(socket.id)
	})
}