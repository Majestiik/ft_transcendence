import { BrowserRouter, Switch, Route } from "react-router-dom"
import Connect from './pages/Connect';
import Friends from './pages/Friends';
import Game from './pages/Game';
import History from './pages/History';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Options from './pages/Options';
import Statisitcs from './pages/Statistics';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, createContext } from "react";
import { getUser } from "./redux/actions/user.actions";
import { updateUser } from "./redux/actions/users.actions";
import { getChannel } from "./redux/actions/channel.actions";
import { getChannels } from "./redux/actions/channels.actions";
import ChatSocket from "./components/ChatSocket";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer);

	useEffect(() => {
		let storedData = window.localStorage.user ? window.localStorage.user.split(",") : null;
		if (storedData)
		{
			dispatch(getUser(storedData[0]));
			dispatch(updateUser(storedData[1], {online: true}));
		}
		dispatch(getChannels());
		dispatch(getChannel(1));
	}, []);

	if (user && user.name !== "")
		return (
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
			<ChatSocket />
			</BrowserRouter>
		);
	else
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Connect} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);	
}

export default App;
