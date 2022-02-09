import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import UserContext from '../components/UserContext';

const Home = () => {

	const contextValue = useContext(UserContext);
	const [shouldLog, setShouldLog] = useState(false);

	useEffect(() => {
		if (shouldLog)
		{
			console.log("wow !");
			setShouldLog(!shouldLog);
		}
	});

    return (
		<div className="home">
			<Navigation />
			<div>Hello { contextValue.name } { contextValue.id }</div>
			<button type='submit' onClick={() => setShouldLog(!shouldLog)} >LOG</button>
		</div>
    );
};

export default Home;