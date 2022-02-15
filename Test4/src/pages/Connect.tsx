import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../assets/components/UserContext';
import axios from 'axios';
import User from '../assets/components/Interface';

const Connect = () => {
	const [shouldUpdate, setShouldUpdate] = useState(true);
	const userContext = useContext(UserContext);
	var inputName: string;

	useEffect(() => {
		console.log("Update in Connect...");
		axios.get('http://10.2.12.2:3003/clients').then((ret) => userContext.updateClientsData(ret.data)).then(() => console.log(userContext.clientsData));
		//window.addEventListener("beforeunload", function() {axios.put('http://localhost:3003/clients/' + userContext.id, {name: userContext.name, avatar: userContext.avatar, level: userContext.level, online: false, ingame: userContext.ingame, friends: userContext.friendsData})});
	}, [shouldUpdate]);

	async function getClient(name: string) : Promise<User | undefined> {
		let users : User[] = (await axios.get('http://10.2.12.2:3003/clients')).data;
		return users.filter(u => u.name == name)[0];
	};

	const handleInput = (input: string) => {
		inputName = input;
	};

	const setUser = () => {
		if (!inputName)
			return;
		getClient(inputName).then((client : User | undefined) => {
			if (!client) {
				axios.post('http://10.2.12.2:3003/clients', {
					name: inputName,
					avatar: "./assets/avatars/avatar1.png",
					level: 0,
					online: true,
					ingame: false,
					friends: [],
					id: 0
				})
				.then(res => userContext.updateUser(res.data));
			} else if (client) {
				client.online = true;
				axios.put('http://10.2.12.2:3003/clients/' + client.id, client);
				userContext.updateUser(client);
				axios.get('http://10.2.12.2:3003/clients').then((ret) => userContext.updateFriendsData(ret.data))
			}
		});
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