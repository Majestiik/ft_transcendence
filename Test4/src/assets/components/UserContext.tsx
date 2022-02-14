import { createContext } from 'react';
//import User from './assets/components/Interface';

const fdat: any[] = [];
const cdat: any[] = [];

export default createContext({
	name: "",
    avatar: "",
    level: 0,
    online: false,
    ingame: false,
	id: 0,
	friendsData: fdat,
	clientsData: cdat,
	updateUser: (data: (any | any[])) => {},
	updateFriendsData: (data: (any| any[])) => {},
	updateClientsData: (data: (any| any[])) => {}
});