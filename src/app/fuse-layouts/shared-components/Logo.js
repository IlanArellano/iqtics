import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	},
	reactBadge: {
		backgroundColor: '#121212',
		color: '#61DAFB'
	}
}));

function Logo() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root)}>
			<Link to="/">
				<div className="flex items-center">
					<img className="logo-icon w-24 h-24" src="assets/images/logos/fuse.svg" alt="logo" />
					<Typography className="text-16 leading-none mx-12 font-medium logo-text" color="#ffffff">
						IQTRACK
					</Typography>
				</div>
			</Link>
		</div>
	);
}

export default Logo;
