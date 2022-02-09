import React, { useState } from 'react';
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
	const contextValue = {
		name: user.name,
    	avatar: user.avatar,
    	level: user.level,
    	online: user.online,
    	ingame: user.ingame,
		id: user.id,
		updateUser: setUser
	};

	window.addEventListener("beforeunload", (ev) => {  
	    ev.preventDefault();
	    return ev.returnValue = 'Are you sure you want to close?';
	});

	window.addEventListener("unload", (ev) => {
		//console.log(contextValue);
		//contextValue.updateUser({name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame});
		axios.put('http://localhost:3003/clients/' + contextValue.id, {name: contextValue.name, avatar: contextValue.avatar, level: contextValue.level, online: false, ingame: contextValue.ingame});
	});

	if (user.name !== "")
		return (
			<UserContext.Provider value={contextValue}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/friends" exact component={Friends} />
					<Route path="/game" exact component={Game} />
					<Route path="/history" exact component={History} />
					<Route path="/statistics" exact component={Statisitcs} />
					<Route path="/options" exact component={Options} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
			</UserContext.Provider>
		);
	else
	return (
		<UserContext.Provider value={contextValue}>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Connect} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
		</UserContext.Provider>
	);	
};

export default App;
