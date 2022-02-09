import React, { useState, useContext } from 'react';
import Navigation from '../components/Navigation';
import UserContext from '../components/UserContext';

const Home = () => {

	const contextValue = useContext(UserContext);

    return (
		<div className="home">
			<Navigation />
			Hello { contextValue.name }
		</div>
    );
};

export default Home;