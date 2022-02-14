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
import UserContext from './assets/components/UserContext';
import User from './assets/components/Interface';
// axio.patch
//check les interfaces
function App() {
	
	const [shouldLog, setShouldLog] = useState(true);
	
	const [userList, setUserList] = useState<Array<User>>([]);
	const [user, setUser] = useState<User>({
		name: "",
		avatar: "",
		level: 0,
		online: false,
		ingame: false,
		friends: [],
		id: 0
	});
	
	const [friendsDt, setFriendsData] = useState<Array<any>>([]);
	
	const findFriendsData = (data: (any[])) => {
		data.forEach(element => {	
			if(element.name === userContext.name)
				setFriendsData(element.friends)});
	};
	
	const userContext = {
		name: user.name,
    	avatar: user.avatar,
    	level: user.level,
    	online: user.online,
    	ingame: user.ingame,
		id: user.id,
		friendsData: friendsDt,
		clientsData: userList,
		updateUser: setUser,
		updateFriendsData: findFriendsData,
		updateClientsData: setUserList
	};

	useEffect(() => {
		if (shouldLog)
		{
			console.log("Update in App ...");
			/*const userArray:Array<User> = [];
			axios.get('http://localhost:3003/clients')
			.then(response => {	
			response.data.forEach((item:any)=>{
				userArray.push({
					name: item.name,
					avatar: item.avatar,
					level: item.level,
					online: item.online,
					ingame: item.ingame,
					id: item.id,
					friends: item.friends
				})
			})
			setUserList(userArray);
		}).then(() => console.log(userArray));
			setShouldLog(!shouldLog);*/
		}
	}, [shouldLog]);

	if (user.name !== "")
		return (
			<BrowserRouter>
				<UserContext.Provider value={userContext}>
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
				<UserContext.Provider value={userContext}>
					<Switch>
						<Route path="/" exact component={Connect} />
						<Route component={NotFound} />
					</Switch>
				</UserContext.Provider>
			</BrowserRouter>
		);	
}

export default App;
