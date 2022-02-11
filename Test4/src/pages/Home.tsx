import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navigation from '../assets/components/Navigation';

const Home = () => {
	const [shouldLog, setShouldLog] = useState(true);
	//var user;

	useEffect(() => {
		if (shouldLog)
		{
			console.log("Update in Home ...");
			/*axios.get('http://localhost:3003/clients').then((ret) => {ret.data.forEach(function (element: [string, number, boolean, []]) {
				console.log(Object.entries(element).at(0)?.at(1));}
			);});*/

			setShouldLog(!shouldLog);
		}
	}, [shouldLog]);
	return (
		<div className="home">
			<Navigation />
		</div>
	);
};

export default Home;