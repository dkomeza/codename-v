import { useEffect, useState } from "react"
import {X} from "lucide-react"
import Poof from "./poof"

function Chat(){

	const [visibility, setVisibility] = useState(true)
	const [token, setToken] = useState("")
	const [messages, setMessages] = useState([
		{
			user1Id: 1,
			user2Id: 2,
			message: "witam"
		},
		{
			user1Id: 2,
			user2Id: 1,
			message: "witam!"
		},
		{
			user1Id: 1,
			user2Id: 2,
			message: "!witamasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd!"
		},
	])

	async function fetchMessages(token:any){
		const messages = await fetch("/api/chat/loadChat", {
			method: 'POST',
			body: JSON.stringify({
				reciverId: "1234"
			}),
  			headers: {
    			'Authorization': `Bearer ${token}`,
				'Access-Control-Allow-Origin':'*',
    			'Content-Type': 'application/json'
  			}
		})
		// setMessages(await messages.json());
	}


	useEffect(() => {
		const token = localStorage.getItem("authToken")
		console.log(token);
		if (token) {
			setToken(token)
			fetchMessages(token)
		}
		
	}, []);

	function hide(){
		setVisibility(false)
	}


	return (
		<div className={visibility ? "z-20 h-160 w-100 bg-red-50 absolute bottom-10 right-10 rounded-xl": "z-20 h-160 w-100 bg-red-50 absolute bottom-10 right-10 rounded-xl invisible"}>
			<button className="rounded-full bg-red-300 h-10 w-10 flex items-center justify-center absolute right-3 top-3 z-30">
				<X onClick={hide}/>
			</button>

			<div className="overflow-y-scroll h-140 relative top-10 w-90 left-10">
				{messages.map((message) => <Poof text={message.message} user={message.user1Id}></Poof>)}
			</div>


		</div>
	)
}

export default Chat