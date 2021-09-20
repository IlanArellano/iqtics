import Map from './Map';
import CurrentLocationMap from './config/CurrentLocationMap';
import GeofenceMap from './config/GeofenceMap';
import AccuracyMap from './config/AccuaryMap';
import CurrentPositionsMap from './config/currentPositionsMap';
import SelectedDeviceMap from './config/SelectedDeviceMap';

export default function MapIndex({ pos, devices }) {
	return (
		<Map>
			<CurrentLocationMap />
			{/* <GeofenceMap /> */}
			<AccuracyMap pos={pos} />
			<CurrentPositionsMap positions={pos} devices={devices} />
			{/* <SelectedDeviceMap />*/}
		</Map>
	);
}
