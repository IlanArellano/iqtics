import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function Map({ ToggleSidebar }) {
	const AccessToken =
		'pk.eyJ1IjoiaWxhbmFyZWxsYW5vMTUiLCJhIjoiY2tvM2Z5MGN2MHBwbDJ6b2lmd3owbGQzYSJ9.yV2m6oR9gvdqruqD7iyJfA';
	const [viewport, setViewport] = useState({
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 8
	});
	return (
		<ReactMapGL
			{...viewport}
			width="100%"
			height="100%"
			mapboxApiAccessToken={AccessToken}
			onViewStateChange={nxtViewport => setViewport(nxtViewport)}
		>
			<ToggleSidebar />
		</ReactMapGL>
	);
}
