import { PrismaClient, type Message, type User } from "@prisma/client";
const prisma = new PrismaClient();


export const createMessage = async (message: Message)=>{
	const mess = prisma.message.create({
		data:{
			id : message.id,
  			senderUserId: message.senderUserId,
  			chatId: message.chatId,
  			message: message.message,
  			messageTime: message.messageTime,
		}
	})
}

export const getChats = async (user: User) =>{
	const chats = await prisma.chat.findMany({
		where:{
			users:{
				some: {
          			id: user.id
        		}
			}
		}
	})

	return chats
}

export const createChat = async (volunteer: User, organization: User)=>{
	const chat = await prisma.chat.create({
		data:{
			users: {
				connect:[{id: volunteer.id}, {id: organization.id}]
			}
		}
	})
}

export const getUser = async (id: string)=>{
	const user = await prisma.user.findFirst({
			select: {
				id: true,
				name: true,
				surname: true,
				email: true
			},
			where: {
				id:{
					equals: id
				}
			}
		}) as User;
	return user
}