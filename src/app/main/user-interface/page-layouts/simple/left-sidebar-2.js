import FusePageSimple from '@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useRef, useState } from 'react';
import IqMap from '../../../iqtrackComponents/map';
import SidebarHeader from '../../../iqtrackComponents/SidebarHeader';
import SidebarCarsContent from '../../../iqtrackComponents/SidebarCarsContent';

const useStyles = makeStyles({
	layoutRoot: {}
});

function SimpleLeftSidebar2Sample() {
	const classes = useStyles();
	const pageLayout = useRef(null);
	const [display, setDisplay] = useState('');
	const [open, setOpen] = useState(false);

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

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			content={<IqMap ToggleSidebar={ToggleButton} />}
			leftSidebarHeader={
				<div className="p-24">
					<SidebarHeader />
				</div>
			}
			leftSidebarContent={
				<div className="p-24">
					<SidebarCarsContent />
					<SidebarCarsContent />
					<SidebarCarsContent />
					<SidebarCarsContent />
					<SidebarCarsContent />
				</div>
			}
			innerScroll
			ref={pageLayout}
		/>
	);
}

export default SimpleLeftSidebar2Sample;
