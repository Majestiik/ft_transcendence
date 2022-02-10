import { createContext } from 'react';

export default createContext({
	name: "",
    avatar: "",
    level: 0,
    online: false,
    ingame: false,
	id: 0,
	friendsData: [],
	clientsData: [],
	updateUser: (user) => {},
	updateFriendsData: (data) => {},
	updateClientsData: (data) => {}
});
