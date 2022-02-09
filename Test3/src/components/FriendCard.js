import React from 'react';

const FriendCard = ({ friendCard }) => {

	var onlineSrc;
	var ingameSrc;

	friendCard.online ? (onlineSrc = "http://localhost:3000/assets/images/online.png") : (onlineSrc = "http://localhost:3000/assets/images/offline.png");
	friendCard.ingame ? (ingameSrc = "http://localhost:3000/assets/images/ingame.png") : (ingameSrc = "http://localhost:3000/assets/images/outgame.png");

	return (
		<div className='friendCard'>
			<div className='friendCardUp'>
				<img src={onlineSrc} width="40" height="40" alt=""></img>
				<img className='spec' src={ingameSrc} width="40" height="40" alt=""></img>
			</div>
			<div className='friendCardDown'>
				<img src={friendCard.avatar} width="100" height="100" align="bottom" alt=""></img>
				<div> {friendCard.name}</div>
				<div> lvl {friendCard.level}</div>
			</div>
		</div>
	);
};

export default FriendCard;