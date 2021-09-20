import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import maplibregl from 'maplibre-gl';

import { useHistory } from 'react-router-dom';
import { map } from './Map';
import StatusView from './StatusView';

const PositionsMap = ({ positions, devices }) => {
	const id = 'positions';
	const clusters = `${id}-clusters`;

	const history = useHistory();

	const deviceColor = device => {
		switch (device.status) {
			case 'online':
				return 'green';
			case 'offline':
				return 'red';
			default:
				return 'gray';
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const createFeature = (Devices, position) => {
		const device = Devices[position.deviceId];
		return {
			deviceId: position.deviceId,
			name: device.name,
			category: device.category || 'default',
			color: deviceColor(device)
		};
	};

	// eslint-disable-next-line no-return-assign
	const onMouseEnter = () => (map.getCanvas().style.cursor = 'pointer');
	// eslint-disable-next-line no-return-assign
	const onMouseLeave = () => (map.getCanvas().style.cursor = '');

	const onMarkerClick = useCallback(
		event => {
			return;
			// eslint-disable-next-line no-unreachable
			const feature = event.features[0];
			const coordinates = feature.geometry.coordinates.slice();
			while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
			}

			const placeholder = document.createElement('div');
			ReactDOM.render(
				<StatusView
					deviceId={feature.properties.deviceId}
					onShowDetails={positionId => history.push(`/position/${positionId}`)}
					onShowHistory={() => history.push('/replay')}
					onEditClick={deviceId => history.push(`/device/${deviceId}`)}
				/>,
				placeholder
			);

			new maplibregl.Popup({
				offset: 25,
				anchor: 'top'
			})
				.setDOMContent(placeholder)
				.setLngLat(coordinates)
				.addTo(map);
		},
		[history]
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onClusterClick = event => {
		const features = map.queryRenderedFeatures(event.point, {
			layers: [clusters]
		});
		const clusterId = features[0].properties.cluster_id;
		map.getSource(id).getClusterExpansionZoom(clusterId, (error, zoom) => {
			if (!error) {
				map.easeTo({
					center: features[0].geometry.coordinates,
					zoom
				});
			}
		});
	};

	useEffect(() => {
		map.addSource(id, {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: []
			},
			cluster: true,
			clusterMaxZoom: 14,
			clusterRadius: 50
		});
		map.addLayer({
			id,
			type: 'symbol',
			source: id,
			filter: ['!', ['has', 'point_count']],
			layout: {
				'icon-image': '{category}-{color}',
				'icon-allow-overlap': true,
				'text-field': '{name}',
				'text-allow-overlap': true,
				'text-anchor': 'bottom',
				'text-offset': [0, -2],
				'text-font': ['Roboto Regular'],
				'text-size': 12
			},
			paint: {
				'text-halo-color': 'white',
				'text-halo-width': 1
			}
		});
		map.addLayer({
			id: clusters,
			type: 'symbol',
			source: id,
			filter: ['has', 'point_count'],
			layout: {
				'icon-image': 'background',
				'text-field': '{point_count_abbreviated}',
				'text-font': ['Roboto Regular'],
				'text-size': 14
			}
		});

		map.on('mouseenter', id, onMouseEnter);
		map.on('mouseleave', id, onMouseLeave);
		map.on('mouseenter', clusters, onMouseEnter);
		map.on('mouseleave', clusters, onMouseLeave);
		map.on('click', id, onMarkerClick);
		map.on('click', clusters, onClusterClick);

		return () => {
			Array.from(map.getContainer().getElementsByClassName('maplibregl-popup')).forEach(el => el.remove());

			map.off('mouseenter', id, onMouseEnter);
			map.off('mouseleave', id, onMouseLeave);
			map.off('mouseenter', clusters, onMouseEnter);
			map.off('mouseleave', clusters, onMouseLeave);
			map.off('click', id, onMarkerClick);
			map.off('click', clusters, onClusterClick);

			if (map.getLayer(id)) {
				map.removeLayer(id);
			}
			if (map.getLayer(clusters)) {
				map.removeLayer(clusters);
			}
			if (map.getSource(id)) {
				map.removeSource(id);
			}
		};
	}, [clusters, onClusterClick, onMarkerClick]);

	useEffect(() => {
		console.log({
			devices,
			positions
		});
		map.getSource(id).setData({
			type: 'FeatureCollection',
			features: positions
				// eslint-disable-next-line no-prototype-builtins
				.filter(it => devices.hasOwnProperty(it.deviceId))
				.map(position => ({
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [position.longitude, position.latitude]
					},
					properties: createFeature(devices, position)
				}))
		});
	}, [createFeature, devices, positions]);

	return null;
};

export default PositionsMap;
