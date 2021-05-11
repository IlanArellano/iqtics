import React, { createContext, useState, useEffect } from 'react';

const Context = createContext();

export function UserProvider({ children }) {
	const [userToken, setUserToken] = useState(() => window.localStorage.getItem('userToken'));

	useEffect(() => {
		console.log(userToken);
	}, [userToken]);
	return <Context.Provider value={{ userToken, setUserToken }}>{children}</Context.Provider>;
}

export default Context;
