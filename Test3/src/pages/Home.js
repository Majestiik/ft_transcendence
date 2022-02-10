import React, { useEffect, useState, useContext } from 'react';
import Navigation from '../components/Navigation';
import UserContext from '../components/UserContext';
import axios from 'axios';
import UserCard from '../components/UserCard';

const Home = () => {

	const contextValue = useContext(UserContext);
	const [shouldLog, setShouldLog] = useState(true);
	//var user;

	useEffect(() => {
		if (shouldLog)
		{
			console.log("Update in Home ...");
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateClientsData(ret.data));
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateFriendsData(ret.data));
			window.addEventListener("beforeunload", function() {axios.put('http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame, friends: contextValue.friendsData})});
			setShouldLog(!shouldLog);
		}
	}, [shouldLog]);

    return (
		<div className="home">
			<Navigation userCard={contextValue}/>
			<button onClick={() => setShouldLog(!shouldLog)}>f5</button>
		</div>
    );
};

export default Home;