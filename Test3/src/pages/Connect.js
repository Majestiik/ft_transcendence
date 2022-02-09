import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../components/UserContext';
import axios from 'axios';

const Connect = () => {

	const contextValue = useContext(UserContext);
	var inputName;
	const [newsDataClients, setNewsDataClients] = useState([]);


	useEffect(() => {
			getData('http://localhost:3003/clients', setNewsDataClients);
	}, []);

	const getData = (url, setNewsData) => {
		axios.get(url).then((res) => setNewsData(res.data));
	};

	const checkExist = (name) => {
		//getData('http://localhost:3003/clients', setNewsDataClients);
		var find = false;
		var client;
		newsDataClients.forEach(element => (element && name && (element.name.toUpperCase() === name.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		if (find)
		{
			console.log("Find !");
			return client;
		}
	};
	
	const handleInput = (input) => {
		inputName = input;
	};

	const setUser = () => {
		var client = checkExist(inputName);
		if (inputName && !client)
		{
			axios.post('http://localhost:3003/clients', {
				name: inputName,
				avatar: "http://localhost:3000/assets/avatars/avatar1.png",
				level: 0,
				online: true,
				ingame: false,
				id: 0
			});
			client = checkExist(inputName);
			contextValue.updateUser(client);
			//axios.post('http://localhost:3003/clients', contextValue);
			
		}
		else if (inputName && client)
		{
			axios.put('http://localhost:3003/clients/' + client.id, {name: client.name, avatar: client.avatar, level: client.level, online: true, ingame: client.ingame});
			contextValue.updateUser(client);
			//console.log(contextValue);
			//axios.post('http://localhost:3003/clients', client);
		}
	};

	return (
		<div className='connect'>
				Type your Name :
				<input onChange={(e) => handleInput(e.target.value)} placeholder='type your name'></input>
				<button type='submit' onClick={setUser}>confirm</button>
		</div>
	);
};

export default Connect;