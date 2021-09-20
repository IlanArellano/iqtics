export default function getPositionsD(vehicles, positions) {
	if (vehicles === null || positions === null) return null;
	if (!Array.isArray(vehicles) || !Array.isArray(positions)) return null;
	const deviceObject = vehicles.map(v => {
		const con = positions.find(p => p.deviceId === v.id);
		if (con) {
			return { ...v, positions: con };
		}
		return v;
	});

	return deviceObject;
}
