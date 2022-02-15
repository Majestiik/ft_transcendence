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
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateClientsData(ret.data));
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateFriendsData(ret.data));
			window.addEventListener("beforeunload", function() {axios.put('http://http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame, friends: contextValue.friendsData})});
			setShouldUpdate(!shouldUpdate);
		}
	}, [shouldUpdate]);

	const test = () => {
		axios.get('http://localhost:3001/').then((ret) => console.log(ret));
	};

	return (
		<div className="home">
			<Navigation userCard={contextValue} />
			<button type='submit' onClick={() => {test()}}>test</button>
		</div>
	);
};

export default Home;