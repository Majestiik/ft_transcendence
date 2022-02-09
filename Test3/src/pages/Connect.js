import React, { useState, useContext } from 'react';
import UserContext from '../components/UserContext';

const Connect = () => {

	const contextValue = useContext(UserContext);
	var inputName;

	const handleInput = (input) => {
		inputName = input;
	};

	const setUser = () => {
		const user = {
			name: inputName,
			avatar: "http://localhost:3000/assets/avatars/avatar1.png",
			level: 0,
			online: true,
			ingame: false
		}
		contextValue.updateUser(user);
	};

	return (
		<div className='friendsSearch'>
				Type your Name :
				<input onChange={(e) => handleInput(e.target.value)} placeholder='type name'></input>
				<button type='submit' onClick={setUser}>add</button>
		</div>
	);
};

export default Connect;