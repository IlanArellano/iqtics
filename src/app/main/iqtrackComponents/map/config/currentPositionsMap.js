import { useSelector } from 'react-redux';

import PositionsMap from '../PositionsMap';

const CurrentPositionsMap = ({ positions, devices }) => {
	return <PositionsMap positions={positions} devices={devices} />;
};

export default CurrentPositionsMap;
