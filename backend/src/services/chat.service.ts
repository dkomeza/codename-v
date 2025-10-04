import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);

// Configure CORS
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});



io.on("connection", (socket: Socket) =>{
	socket.on("message", (data)=>{
		//wstaw wiadomość do bazy


		//wyśli do adresata
		socket.emit(data)
	})
})