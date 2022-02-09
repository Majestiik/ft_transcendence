import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import axios from 'axios';
import FriendCard from '../components/FriendCard';
import UserContext from '../components/UserContext';

const Friends = () => {
	
	const [newsDataFriends, setNewsDataFriends] = useState([]);
	const [newsDataClients, setNewsDataClients] = useState([]);
	var inputName;

	useEffect(() => {
		getData('http://localhost:3003/friends', setNewsDataFriends);
		getData('http://localhost:3003/clients', setNewsDataClients);
	}, []);

	const getData = (url, setNewsData) => {
		axios.get(url).then((res) => setNewsData(res.data));
	};

	const addFriend = () => {
		var find = false;
		var client;
		newsDataClients.forEach(element => (inputName && (element.name.toUpperCase() == inputName.toUpperCase())) ? ((client = element) && (find = true)) : (null));
		if (find)
		{
			axios.post('http://localhost:3003/friends', client);
			getData('http://localhost:3003/friends', setNewsDataFriends);
		}
		else
			alert("Not Found !");
	};

	const handleInput = (input) => {
		inputName = input;
	};

	return (
		<div className="friends">
			<Navigation />
			<div className='friendsSearch'>
				Add Friend :
				<input onChange={(e) => handleInput(e.target.value)} placeholder='type name'></input>
				<button type='submit' onClick={addFriend}>add</button>
			</div>
			<ul className='friendsList'>
				{newsDataFriends.map((friendCard) => 
				(<FriendCard key={friendCard.id} friendCard={friendCard} />))}
			</ul>
		</div>
	);
};

export default Friends;