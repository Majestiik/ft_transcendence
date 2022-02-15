import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../assets/components/UserContext';
import User from '../assets/components/Interface';
import Navigation from '../assets/components/Navigation';
import FriendCard from '../assets/components/FriendCard';

const Friends = () => {
	const userContext = useContext(UserContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);
	var inputName: string = "";

	
	useEffect(() => {
		if (shouldUpdate)
		{
			console.log("Update in Friends...");
			axios.get('http://localhost:3003/clients').then((ret) => userContext.updateClientsData(ret.data));
			axios.get('http://localhost:3003/clients').then((ret) => userContext.updateFriendsData(ret.data));
			window.addEventListener("beforeunload", function() {axios.patch('http://localhost:3003/clients/' + userContext.id, {online: false}/*{name: userContext.name, avatar: userContext.avatar, level: userContext.level, online: false, ingame: userContext.ingame, friends: userContext.friendsData}*/)});
			setShouldUpdate(!shouldUpdate);
		}
	}, [shouldUpdate]);

	const addFriend = () => {
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
		userContext.clientsData.forEach(element => (inputName && (element.name.toUpperCase() === inputName.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		if (find)
		{
			userContext.friendsData.push(client.name);
			axios.put('http://localhost:3003/clients/' + userContext.id, {name: userContext.name, avatar: userContext.avatar, level: userContext.level, online: userContext.online, ingame: userContext.ingame, friends: userContext.friendsData});
		}
		else
			alert("Not Found !");
	};

	const handleInput = (input: string) => {
		inputName = input;
	};

	return (
		<div className="friends">
			<Navigation userCard={userContext}/>
			<div className='friendsSearch'>
				Add Friend :
				<input onChange={(e) => handleInput(e.target.value)} placeholder='type name'></input>
				<button type='submit' onClick={() => {setShouldUpdate(!shouldUpdate); addFriend();}}>add</button>
				<button type='submit' onClick={() => setShouldUpdate(!shouldUpdate)}>f5</button>
			</div>
			<ul className='friendsList'>
				{userContext.clientsData.map((friendCard) => {
					if (userContext.friendsData.indexOf(friendCard.name) > -1)
						return <FriendCard key={friendCard.id} friendCard={friendCard} />})}
			</ul>
		</div>
	);
};

export default Friends;