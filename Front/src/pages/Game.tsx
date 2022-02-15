import React, { useEffect, useState, useContext } from 'react';
import Navigation from '../assets/components/Navigation';
import UserContext from '../assets/components/UserContext';
import axios from 'axios';
import User from '../assets/components/Interface';

const Game = () => {
	const userContext = useContext(UserContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);
	
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

	return (
		<div>
			<Navigation userCard={userContext}/>
		</div>
	);
};

export default Game;