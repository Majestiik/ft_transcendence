import React, { useState, useContext } from 'react';
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
	
	const [user, setUser] = useState({name: "", avatar: "", level: 0, online: false, ingame: false});
	const contextValue = {
		name: user.name,
    	avatar: user.avatar,
    	level: user.level,
    	online: user.online,
    	ingame: user.ingame,
		updateUser: setUser
	};

	if (user.name != "")
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
