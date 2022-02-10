import React, { useEffect, useState, useContext } from 'react';
import Navigation from '../components/Navigation';
import UserContext from '../components/UserContext';
import axios from 'axios';

const Options = () => {
	const contextValue = useContext(UserContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);
	
	useEffect(() => {
		if (shouldUpdate)
		{
			console.log("Update in Options ...");
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateClientsData(ret.data));
			axios.get('http://localhost:3003/clients').then((ret) => contextValue.updateFriendsData(ret.data));
			window.addEventListener("beforeunload", function() {axios.put('http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame, friends: contextValue.friendsData})});
			setShouldUpdate(!shouldUpdate);
		}
	}, [shouldUpdate]);

	return (
		<div className="options">
			<Navigation userCard={contextValue}/>
		</div>
	);
};

export default Options;