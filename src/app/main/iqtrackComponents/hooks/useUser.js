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

	const getUserPassword = async () => {
		const userInfoDecoded = window.atob(userToken);
		const getUser = userInfoDecoded.split(':');
		if (getUser && getUser.length > 0) {
			try {
				const res = await fetch(`https://${process.env.REACT_APP_API_URL}/api/session`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					},
					body: `email=${getUser[0]}&password=${getUser[1]}`
				});
				if (res.ok) {
					const response = await res.json();
					return {
						name: response.name,
						rol: response.administrator ? 'Administrador' : 'Usuario'
					};
				}
				return null;
			} catch (error) {
				return {
					error
				};
			}
		}
		return null;
	};

	const logout = useCallback(() => {
		window.localStorage.removeItem('userToken');
		setUserToken(null);
	}, [setUserToken]);
	return {
		isLoggedIn: Boolean(userToken),
		getToken,
		getUserPassword,
		login,
		logout
	};
}
