import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navigation from '../assets/components/Navigation';
import UserContext from '../assets/components/UserContext';

const Home = () => {
	const contextValue = useContext(UserContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);
	
	useEffect(() => {
		if (shouldUpdate)
		{
			console.log("Update in Home...");
			axios.get('http://10.2.12.2:3003/clients').then((ret) => contextValue.updateClientsData(ret.data));
			axios.get('http://10.2.12.2:3003/clients').then((ret) => contextValue.updateFriendsData(ret.data));
			window.addEventListener("beforeunload", function() {axios.put('http://http://10.2.12.2:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame, friends: contextValue.friendsData})});
			setShouldUpdate(!shouldUpdate);
		}
	}, [shouldUpdate]);
	return (
		<div className="home">
			<Navigation userCard={contextValue} />
		</div>
	);
};

export default Home;