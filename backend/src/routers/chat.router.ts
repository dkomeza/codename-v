import bodyParser from "body-parser";
import express from "express";
// import { authenticate } from "../services/auth.service";

const chatRouter = express.Router();

chatRouter.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

chatRouter.get("/", (req, res)=>{
	try{
		//pobierz z bazki czaty
		res.send({test: "test"})
	}catch (error: any) {
    	res.status(400).send({ error: error.message });
  	}
})

chatRouter.post("/new", (req, res)=>{
	res.send({})
})


export default chatRouter
