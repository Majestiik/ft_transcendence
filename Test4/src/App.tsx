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
// axio.patch
//check les interfaces
function App() {

	interface Test {
		key: string
		name: string
	}

	const [shouldLog, setShouldLog] = useState(true);

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

	const findFriendsData = (data: (string | number | boolean | [])) => {
		let myVar: Test;
		for (const [key, value] of Object.entries(data)) {
			if (Object.entries(value).at(0)?.at(1) === "666")
			{
				console.log("entries");
				console.log(value);
				Object.entries(value).map(function(key: Test)
				{
					console.log("value");
					if (key[0] === "friends")
						key.map(function(key){
							if (key != "friends")
								myVar = key[1];
						});
				});	
			}
				//setFriendsData(Object.entries(value).at(5)?.at(1));
	}};

	const userContext = {
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

	useEffect(() => {
		if (shouldLog)
		{
			console.log("Update in Home ...");
			axios.get('http://localhost:3003/clients').then((ret) => findFriendsData(ret.data));

			setShouldLog(!shouldLog);
		}
	}, [shouldLog]);
	/*const findFriendsData = (data: (string | number | boolean)[]) => {
		data.forEach(element => {	
			if(element.name === contextValue.name)
				setFriendsData(element.friends)});
	};*/

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
}

export default App;
