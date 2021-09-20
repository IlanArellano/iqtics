import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useRef, useContext } from 'react';
import Map from '../../../iqtrackComponents/map';
import SidebarHeader from '../../../iqtrackComponents/SidebarHeader';
import SidebarCarsContent from '../../../iqtrackComponents/SidebarCarsContent';
import DeviceContext from '../../../iqtrackComponents/context/devices';

const useStyles = makeStyles({
	layoutRoot: {}
});

function SimpleLeftSidebar2Sample() {
	const { devices, positions } = useContext(DeviceContext);
	const classes = useStyles();
	const pageLayout = useRef(null);

	const ToggleButton = () => {
		return (
			<Hidden lgUp>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<IconButton onClick={ev => pageLayout.current.toggleLeftSidebar()} aria-label="open left sidebar">
					<Icon>arrow_back</Icon>
				</IconButton>
			</Hidden>
		);
	};

	if (devices.length === 0) return null;
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			content={<Map pos={positions} devices={devices} />}
			leftSidebarHeader={
				<div className="p-24">
					<SidebarHeader />
				</div>
			}
			leftSidebarContent={
				<div className="p-24">
					<SidebarCarsContent devices={devices} />
				</div>
			}
			innerScroll
			ref={pageLayout}
		/>
	);
}

export default SimpleLeftSidebar2Sample;
