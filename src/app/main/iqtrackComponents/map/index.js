import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import MapIcon from '../items/MapIcon';

export default function Map({ ToggleSidebar }) {
	const AccessToken =
		'pk.eyJ1IjoiaWxhbmFyZWxsYW5vMTUiLCJhIjoiY2tvM2Z5MGN2MHBwbDJ6b2lmd3owbGQzYSJ9.yV2m6oR9gvdqruqD7iyJfA';
	const [viewport, setViewport] = useState({
		latitude: 19.706399206887557,
		longitude: -101.19565311933592,
		zoom: 12
	});
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
			<Marker latitude={19.698953439832575} longitude={-101.20611929818747}>
				<MapIcon />
			</Marker>
		</ReactMapGL>
	);
}
