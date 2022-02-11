import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Connect from './pages/Connect';
import Friends from './pages/Friends';
import Game from './pages/Game';
import History from './pages/History';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Options from './pages/Options';
import Statisitcs from './pages/Statistics';
import UserContext from './components/UserContext';

const App = () => {

	const [user, setUser] = useState({
		name: "",
		avatar: "",
		level: 0,
		online: false,
		ingame: false,
		id: 0
	});

	const [friendsDt, setFriendsData] = useState([]);
	const [clientsDt, setClientsData] = useState([]);

	const findFriendsData = (data) => {
		data.forEach(element => {	
			if(element.name === contextValue.name)
				setFriendsData(element.friends)});
	}

	const contextValue = {
		name: user.name,
    	avatar: user.avatar,
    	level: user.level,
    	online: user.online,
    	ingame: user.ingame,
		id: user.id,
		friendsData: friendsDt,
		clientsData: clientsDt,
		updateUser: setUser,
		updateFriendsData: findFriendsData,
		updateClientsData: setClientsData
	};

	if (user.name !== "")
		return (
			<BrowserRouter>
				<UserContext.Provider value={contextValue}>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/friends" exact component={Friends} />
						<Route path="/game" exact component={Game} />
						<Route path="/history" exact component={History} />
						<Route path="/statistics" exact component={Statisitcs} />
						<Route path="/options" exact component={Options} />
						<Route component={NotFound} />
					</Switch>
				</UserContext.Provider>
			</BrowserRouter>
		);
	else
	return (
		<BrowserRouter>
			<UserContext.Provider value={contextValue}>
				<Switch>
					<Route path="/" exact component={Connect} />
					<Route component={NotFound} />
				</Switch>
			</UserContext.Provider>
		</BrowserRouter>
	);	
};

export default App;
