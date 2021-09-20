import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { SwitcherControl } from './switcher';
import { loadImage, prepareIcon } from './mapUtils';
import deviceCategories from '../common/deviceCategories';
import { styleMapbox } from './mapStyle';
import palette from '../common/themePalette';

import 'maplibre-gl/dist/maplibre-gl.css';
import './switcher.css';

const element = document.createElement('div');
element.style.width = '100%';
element.style.height = '100%';

// eslint-disable-next-line import/prefer-default-export
export const map = new maplibregl.Map({
	accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
	container: element,
	style: 'mapbox://styles/ilanarellano15/ckob1tw9w0p5517p14b3hcb6e',
	zoom: 1
});

const readyListeners = new Set();
let ready = false;

const addReadyListener = listener => {
	readyListeners.add(listener);
	listener(ready);
};

const removeReadyListener = listener => {
	readyListeners.delete(listener);
};

const updateReadyValue = value => {
	ready = value;
	readyListeners.forEach(listener => listener(value));
};

const initMap = async () => {
	if (ready) return;
	if (!map.hasImage('background')) {
		const background = await loadImage('images/background.svg');
		map.addImage('background', prepareIcon(background), {
			pixelRatio: window.devicePixelRatio
		});
		await Promise.all(
			deviceCategories.map(async category => {
				const results = [];
				['green', 'red', 'gray'].forEach(color => {
					results.push(
						loadImage(`images/icon/${category}.svg`).then(icon => {
							map.addImage(`${category}-${color}`, prepareIcon(background, icon, palette.common[color]), {
								pixelRatio: window.devicePixelRatio
							});
						})
					);
				});
				await Promise.all(results);
			})
		);
	}
	updateReadyValue(true);
};

map.addControl(
	new maplibregl.NavigationControl({
		showCompass: false
	})
);

const switcher = new SwitcherControl(
	() => updateReadyValue(false),
	() => {
		const waiting = () => {
			if (!map.loaded()) {
				setTimeout(waiting, 100);
			} else {
				initMap();
			}
		};
		waiting();
	}
);

map.addControl(switcher);

const Map = ({ children }) => {
	const containerEl = useRef(null);
	const [mapReady, setMapReady] = useState(false);

	const mapboxAccessToken = process.env.REACT_APP_MAPBOX_TOKEN || null;
	// const mapTilerKey = useAttributePreference('mapTilerKey');

	useEffect(() => {
		console.log(mapboxAccessToken);
		maplibregl.accessToken = mapboxAccessToken;
	}, [mapboxAccessToken]);

	useEffect(() => {
		switcher.updateStyles(
			[
				{ id: 'mapboxStreets1', title: 'Default', uri: styleMapbox('streets-v11') },
				{ id: 'mapboxOutdoors2', title: 'Mapbox Outdoors', uri: styleMapbox('outdoors-v11') },
				{ id: 'mapboxSatellite3', title: 'mapBox Satelite', uri: styleMapbox('satellite-v9') }
			],
			'osm'
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const listener = Ready => setMapReady(Ready);
		addReadyListener(listener);
		return () => {
			removeReadyListener(listener);
		};
	}, []);

	useLayoutEffect(() => {
		const currentEl = containerEl.current;
		currentEl.appendChild(element);
		map.resize();
		return () => {
			currentEl.removeChild(element);
		};
	}, [containerEl]);

	return (
		<div style={{ width: '100%', height: '100%' }} ref={containerEl}>
			{mapReady && children}
		</div>
	);
};

export default Map;
