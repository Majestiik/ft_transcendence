import React from 'react';

const FriendCard = ({ friendCard }:any) => {

	var onlineSrc;
	var ingameSrc;

	friendCard.online ? (onlineSrc = "./assets/images/online.png") : (onlineSrc = "./assets/images/offline.png");
	friendCard.ingame ? (ingameSrc = "./assets/images/ingame.png") : (ingameSrc = "./assets/images/outgame.png");

	return (
		<div className='friendCard'>
			<div className='friendCardUp'>
				<img src={onlineSrc} width="40" height="40" alt=""></img>
				<img className='spec' src={ingameSrc} width="40" height="40" alt=""></img>
			</div>
			<div className='friendCardDown'>
				<img src={friendCard.avatar} width="100" height="100" align-item="bottom" alt=""></img>
				<div> {friendCard.name}</div>
				<div> lvl {friendCard.level}</div>
			</div>
		</div>
	);
};

export default FriendCard;