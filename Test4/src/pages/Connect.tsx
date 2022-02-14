import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../assets/components/UserContext';
import axios from 'axios';
import User from '../assets/components/Interface';

const Connect = () => {
	const [shouldUpdate, setShouldUpdate] = useState(true);
	const contextValue = useContext(UserContext);
	var inputName: string;

	useEffect(() => {
		console.log("Update in Connect...");
		axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateClientsData(ret.data)).then(() => console.log(contextValue.clientsData));
		//window.addEventListener("beforeunload", function() {axios.put('http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame, friends: contextValue.friendsData})});
	}, [shouldUpdate]);

	const checkExist = (name: string) => {
		var find = false;
		var client: User =({
			name: "",
			avatar: "",
			level: 0,
			online: false,
			ingame: false,
			friends: [],
			id: 0
		});
		contextValue.clientsData.forEach(element => (element && name && (element.name.toUpperCase() === name.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		return client;
	};

	const getUserInData = (name: string, data: any[]) => {
		var find = false;
		var client: User =({
			name: "",
			avatar: "",
			level: 0,
			online: false,
			ingame: false,
			friends: [],
			id: 0
		});
		data.forEach(element => (element && name && (element.name.toUpperCase() === name.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		return client;
	};

	const handleInput = (input: string) => {
		inputName = input;
	};

	const setUser = () => {
		var client: User = checkExist(inputName);
		if (inputName && client.name === "")
		{
			axios.post('http://localhost:3003/clients', {
				name: inputName,
				avatar: "http://localhost:3000/assets/avatars/avatar1.png",
				level: 0,
				online: true,
				ingame: false,
				friends: [],
				id: 0
			})
			.then(() => axios.get('http://localhost:3003/clients'))
			.then((res) => client = getUserInData(inputName, res.data))
			.then(() => contextValue.updateUser(client));
		}
		else if (inputName && client)
		{
			axios.put('http://localhost:3003/clients/' + client.id, {name: client.name, avatar: client.avatar, level: client.level, online: true, ingame: client.ingame, friends: client.friends});
			contextValue.updateUser(client);
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateFriendsData(ret.data))
		}
	};

	return (
		<div className='connect'>
				Type your Name :
				<input onChange={(e) => handleInput(e.target.value)} placeholder='yes here ...'></input>
				<button type='submit' onClick={setUser}>confirm</button>
		</div>
	);
};

export default Connect;