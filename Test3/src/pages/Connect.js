import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import axios from 'axios';

const Connect = () => {

	const contextValue = useContext(UserContext);
	var inputName;

	useEffect(() => {
		console.log("Update in Connect...");
		axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateClientsData(ret.data));
		window.addEventListener("beforeunload", function() {axios.put('http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame, friends: contextValue.friendsData})});
	}, []);

	const checkExist = (name) => {
		var find = false;
		var client;
		contextValue.clientsData.forEach(element => (element && name && (element.name.toUpperCase() === name.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		if (find)
			return client;
	};

	const getUserInData = (name, data) => {
		var find = false;
		var client;
		data.forEach(element => (element && name && (element.name.toUpperCase() === name.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		if (find)
			return client;
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