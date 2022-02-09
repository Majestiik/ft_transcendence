import React, { useState, useContext } from 'react';
import Navigation from '../components/Navigation';
import UserContext from '../components/UserContext';

const Game = () => {
	return (
		<div className="game">
			<Navigation />
		</div>
	);
};

export default Game;