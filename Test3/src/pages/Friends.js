import React, { useEffect, useState, useContext } from 'react';
import Navigation from '../components/Navigation';
import axios from 'axios';
import FriendCard from '../components/FriendCard';
import UserContext from '../components/UserContext';

const Friends = () => {
	
	const contextValue = useContext(UserContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);
	var inputName;

	
	useEffect(() => {
		if (shouldUpdate)
		{
			console.log("Update in Friends...");
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateClientsData(ret.data));
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateFriendsData(ret.data));
			window.addEventListener("beforeunload", function() {axios.put('http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame, friends: contextValue.friendsData})});
			setShouldUpdate(!shouldUpdate);
		}
	}, [shouldUpdate]);

	const addFriend = () => {
		var find = false;
		var client;
		contextValue.clientsData.forEach(element => (inputName && (element.name.toUpperCase() === inputName.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		if (find)
		{
			contextValue.friendsData.push(client.name);
			axios.put('http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: contextValue.online, ingame: contextValue.ingame, friends: contextValue.friendsData});
		}
		else
			alert("Not Found !");
	};


	const handleInput = (input) => {
		inputName = input;
	};

	return (
		<div className="friends">
			<Navigation userCard={contextValue}/>
			<div>{contextValue.data}</div>
			<div className='friendsSearch'>
				Add Friend :
				<input onChange={(e) => handleInput(e.target.value)} placeholder='type name'></input>
				<button type='submit' onClick={() => {setShouldUpdate(!shouldUpdate); addFriend();}}>add</button>
				<button type='submit' onClick={() => setShouldUpdate(!shouldUpdate)}>f5</button>
			</div>
			<ul className='friendsList'>
				{contextValue.clientsData.map((friendCard) => {
					if (contextValue.friendsData.indexOf(friendCard.name) > -1)
						return <FriendCard key={friendCard.id} friendCard={friendCard} />})}
			</ul>
		</div>
	);
};

export default Friends;