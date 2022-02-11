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
	updateUser: (data: (string | number | boolean | [])) => {},
	updateFriendsData: (data: (string | number | boolean | [])) => {},
	updateClientsData: (data: (string | number | boolean | [])) => {}
});