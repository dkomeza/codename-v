import { PrismaClient, type Message, type User } from "@prisma/client";
const prisma = new PrismaClient();


export const createMessage = async (message: any)=>{
	const mess = prisma.message.create({
		data:{
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

export const createChat = async (user1Id: string, user2Id: string)=>{
	const chat = await prisma.chat.create({
		data:{
			users: {
				connect:[{id: user1Id}, {id: user2Id}]
			}
		}
	})
	return chat
}

export const getChatByUsersId = async (user1Id:string, user2Id:string)=>{
	const chat = await prisma.chat.findFirst({
		where:{
			AND:[{
					users:{
						some:{
							id: user1Id
						}
					}
				},
				{
					users:{
						some:{
							id: user2Id
						}
					}
				}
			]
		}
	})

	return chat
}

export const loadChat = async (chatId: string) =>{
	const messages = await prisma.message.findMany({
		where:{
			chatId:{
				equals: chatId
			}
		},
		take: 50,
		orderBy:{
			messageTime: "asc"
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