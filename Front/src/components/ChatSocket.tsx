import { timeStamp } from 'console';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { SocketContext } from '..';


const ChatSocket = () => {
	const user = useSelector((state: any) => state.userReducer);
	const socket = useContext(SocketContext);
	const message: any = document.getElementById('message');
	const messages: any = document.getElementById('messages');
	const [msgs, setMsgs] = useState([""]);
	var inputMsg: string = "";
	
	socket.on('msgForCli', (msg: string)  => {
		socket.removeAllListeners();
		setMsgs(oldArray => [...oldArray, msg]);
	});
	
	socket.on('connect', () => {
		console.log("connected");
	});
	
	const handleInput = (input: string) => {
		inputMsg = input;
	};
	
	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter')
			click(e);
	};

	const click = (e: any) => {
		e.preventDefault();
		var input: any = document.getElementById("input");
		input.value = "";
		socket.emit('msgForServ', {cliName: user.name, msg: inputMsg});
		console.log(msgs);
	};
	return (
		<div className='chatSocket'>
			<div className='chatWindow'>
				{
					msgs.map((msg, i) => {
						return(<li key={i} id="messages">{msg}</li>);
					})
				}
			</div>
			<div className='chatForm'>
				<input type='textarea' id='input' onChange={(e) => handleInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} placeholder='type msg'></input>
			</div>
		</div>
	);
};

export default ChatSocket;