import { headers } from '../common/headers';

export default async function getPositions(token) {
	let positions = null;
	const positionsRes = await fetch(`${process.env.REACT_APP_API_URL}/api/positions`, {
		headers: headers(token)
	});

	if (positionsRes.ok && positionsRes.status === 200) {
		positions = await positionsRes.json();
	}

	return positions;
}
