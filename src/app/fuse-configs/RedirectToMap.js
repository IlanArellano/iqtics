import React from 'react';
import useUser from 'app/main/iqtrackComponents/hooks/useUser';
import { Redirect } from 'react-router-dom';

export default function RedirectToMap() {
	const { isLoggedIn } = useUser();
	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}
	return <Redirect to="/app/iqtics/map" />;
}
