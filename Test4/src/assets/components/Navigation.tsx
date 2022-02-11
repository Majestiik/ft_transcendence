import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
	return (
		<div className="navigation">
			<div className="navBar">
				<NavLink exact to="/" activeClassName="nav-active">Home</NavLink>
				<NavLink exact to="/game" activeClassName="nav-active">Game</NavLink>
				<NavLink exact to="/friends" activeClassName="nav-active">Friends</NavLink>
				<NavLink exact to="/statistics" activeClassName="nav-active">Statisitcs</NavLink>
				<NavLink exact to="/history" activeClassName="nav-active">History</NavLink>
				<NavLink exact to="/options" activeClassName="nav-active">Options</NavLink>
			</div>
		</div>
	);
};

export default Navigation;