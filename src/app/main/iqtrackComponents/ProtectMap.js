import React from 'react';
import { Redirect } from 'react-router-dom';
import useUser from './hooks/useUser';

export default function ProtectMap({ children }) {
	const { isLoggedIn } = useUser();

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}
	return <>{children}</>;
}
