import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import UserContext from '../components/UserContext';
import axios from 'axios';

const Home = () => {

	const contextValue = useContext(UserContext);
	const [shouldLog, setShouldLog] = useState(false);
	var user;

	useEffect(() => {
		if (shouldLog)
		{
			console.log("wow !");
			/*user = {
				name: contextValue.name + "!",
				avatar: contextValue.avatar,
				level: contextValue.level,
				online: contextValue.online,
				ingame: contextValue.ingame,
				id: contextValue.id};
			contextValue.updateUser(user)
			axios.put('http://localhost:3003/clients/' + contextValue.id, user);*/
			setShouldLog(!shouldLog);
		}
	}, [shouldLog]);

    return (
		<div className="home">
			<Navigation />
			<div>Hello { contextValue.name } { contextValue.id }</div>
			<button type='submit' onClick={() => setShouldLog(!shouldLog)} >LOG</button>
		</div>
    );
};

export default Home;