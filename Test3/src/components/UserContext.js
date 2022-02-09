import React, { createContext, useState } from 'react';

export default createContext({
	name: "",
    avatar: "",
    level: 0,
    online: false,
    ingame: false,
	id: 0,
	updateUser: (user) => {}
});
