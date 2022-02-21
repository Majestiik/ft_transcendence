import React, { useEffect, useState, useContext } from 'react';
import { useHistory ,useLocation } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../assets/components/Navigation';
import UserContext from '../assets/components/UserContext';

const Home = () => {
	const contextValue = useContext(UserContext);
	const [shouldUpdate, setShouldUpdate] = useState(true);
	var inputName: string = "";
	var baseURL: string = "http://localhost:3001/";

	const location = useLocation()
	const history = useHistory()
	
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

	const handleInput = (input: string) => {
		inputName = input;
	};

	async function test (which: number) {

		console.log("location : " + location.pathname);
		console.log("pathname : " + history.location.pathname);
		console.log("window href : " + window.location.href.split(':', 2));
		if (which === 1)
		{
			axios.get(baseURL + 'clients/all', {headers: {name: 'lol', token: 'love'}}).then((ret) => console.log(ret.data));
		}
		else if (which === 2)
			axios.get(baseURL + 'clients/one/' + inputName).then((ret) => console.log(ret.data));
	};

	return (
		<div className="home">
			<Navigation userCard={contextValue} />
			<input onChange={(e) => handleInput(e.target.value)} placeholder='type client name'></input>
			<button type='submit' onClick={() => {test(2)}}>get One Client</button>
			<button type='submit' onClick={() => {test(1)}}>get All Clients</button>
		</div>
	);
};

export default Home;