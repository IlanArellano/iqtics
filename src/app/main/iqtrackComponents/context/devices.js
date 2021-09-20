import { createContext, useState, useEffect } from 'react';
import getVehicles from '../services/vehicles';
import getPositions from '../services/positions';
import useUser from '../hooks/useUser';
import { parseToArray } from '../common/convert';

const Context = createContext();
export function DevicesContext({ children }) {
	const { getToken } = useUser();
	const token = getToken();
	const [devices, setDevices] = useState([]);
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		// eslint-disable-next-line func-names
		(async function () {
			const v = await getVehicles(token);
			const p = await getPositions(token);
			setDevices(parseToArray(v));
			setPositions(parseToArray(p));
		})();
	}, [token]);

	return <Context.Provider value={{ devices, positions }}>{children}</Context.Provider>;
}

export default Context;
