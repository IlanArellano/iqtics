const getUser = window.localStorage.getItem('userToken') ? window.localStorage.getItem('userToken') : null;

export default async function getDevices() {
	const res = await fetch(`https://${process.env.REACT_APP_API_URL}/api/devices`, {
		headers: {
			Authorization: `Basic ${getUser}`
		}
	});
	if (res.ok) {
		const devices = await res.json();
		const devicesMap = devices.map(device => {
			return {
				name: device.name,
				id: device.id
			};
		});
		return devicesMap;
	}
	return null;
}
