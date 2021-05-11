export default async function getServerInfo(getToken) {
	const res = await fetch(`https://${process.env.REACT_APP_API_URL}/server`, {
		headers: new Headers({
			'Access-Control-Allow-Origin': '*',
			Authorization: `Basic ${getToken}`
		})
	});
	if (res.ok) {
		const info = await res.json();
		return info;
	}
	return null;
}
