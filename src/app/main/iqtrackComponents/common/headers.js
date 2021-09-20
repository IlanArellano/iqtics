// eslint-disable-next-line import/prefer-default-export
export const headers = token =>
	new Headers({
		Authorization: `Basic ${token}`,
		'Content-Type': 'application/json'
	});
