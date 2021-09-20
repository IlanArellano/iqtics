import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import MapIcon from '../items/MapIcon';
import MapDevices from '../mapDevices';

export default function Map({ ToggleSidebar, devices }) {
	console.log(devices);
	const AccessToken =
		'pk.eyJ1IjoiaWxhbmFyZWxsYW5vMTUiLCJhIjoiY2tvM2Z5MGN2MHBwbDJ6b2lmd3owbGQzYSJ9.yV2m6oR9gvdqruqD7iyJfA';
	const [viewport, setViewport] = useState({
		latitude: 19.706399206887557,
		longitude: -101.19565311933592,
		zoom: 12
	});

	useEffect(() => {});

	return (
		<ReactMapGL
			{...viewport}
			width="100%"
			height="100%"
			mapboxApiAccessToken={AccessToken}
			onViewStateChange={nxtViewport => setViewport(nxtViewport)}
			mapStyle="mapbox://styles/ilanarellano15/ckob1tw9w0p5517p14b3hcb6e"
		>
			<ToggleSidebar />
			{devices.map(device => {
				return (
					<Marker key={device.id} latitude={device.positions.latitude} longitude={device.positions.longitude}>
						<MapIcon />
					</Marker>
				);
			})}
		</ReactMapGL>
	);
}
