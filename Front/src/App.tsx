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
import { useEffect } from "react";
import { getUser } from "./redux/actions/user.actions";
import { updateUser } from "./redux/actions/users.actions";

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.userReducer);

	useEffect(() => {
		//let storedData = window.localStorage.user ? window.localStorage.user.split(",") : null;
		//if (storedData)
		//{
		//	dispatch(getUser(storedData[0]));
		//	dispatch(updateUser(storedData[1], {online: true}));
		//}
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
