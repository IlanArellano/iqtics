import { useContext, useCallback } from 'react';
import Context from 'app/IqtrackUserContext';

export default function useUser() {
	const { userToken, setUserToken } = useContext(Context);

	const getToken = () => userToken;

	const login = useCallback(
		({ user, password }) => {
			const encodeUser = window.btoa(`${user}:${password}`);
			window.localStorage.setItem('userToken', encodeUser);
			setUserToken(userToken);
		},
		[setUserToken, userToken]
	);

	const logout = useCallback(() => {
		window.localStorage.removeItem('userToken');
		setUserToken(null);
	}, [setUserToken]);
	return {
		isLoggedIn: Boolean(userToken),
		getToken,
		login,
		logout
	};
}
