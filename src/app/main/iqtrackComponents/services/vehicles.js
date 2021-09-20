import { headers } from '../common/headers';

export default async function getVehicles(token) {
	if (!token) return null;
	let vehicles = null;
	try {
		const deviceRes = await fetch(`${process.env.REACT_APP_API_URL}/api/devices`, {
			headers: headers(token)
		});

		if (deviceRes.ok && deviceRes.status === 200) {
			vehicles = await deviceRes.json();
		}

		return vehicles;
	} catch (error) {
		return { error };
	}
}
