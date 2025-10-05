export default function Poof({text, user}){
	return(
		<>
			<div className={user==1 ?"bg-red-900 w-fit max-w-60 h-fit rounded-xl m-2 p-2 wrap-break-word" : "bg-red-700 w-fit max-w-60 h-fit rounded-xl m-2 p-2 wrap-break-word"}>
				<p>{text}</p>
			</div>
		</>
	)
}