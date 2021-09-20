import React from 'react';
import { Marker } from 'react-map-gl';
import MapIcon from '../items/MapIcon';

export default function MapDevices({ devices }) {
	if (!Array.isArray(devices)) throw new Error('No se puede cargar la data devices');
	return (
		<>
			{devices.map(device => {
				return (
					<Marker key={device.id} latitude={device.positions.latitude} longitude={device.positions.longitude}>
						<MapIcon />
					</Marker>
				);
			})}
		</>
	);
}
