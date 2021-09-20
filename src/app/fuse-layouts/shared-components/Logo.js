import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUser from 'app/main/iqtrackComponents/hooks/useUser';

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
		},
		display: 'flex'
	},
	reactBadge: {
		backgroundColor: '#121212',
		color: '#61DAFB'
	}
}));

function Logo() {
	const [version, setVersion] = useState(null);
	const classes = useStyles();

	const { getToken } = useUser();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/server`, {
			method: 'GET',
			headers: new Headers({
				Authorization: `Basic ${getToken()}`,
				'Content-Type': 'application/json'
			})
		})
			.then(res => {
				if (res.ok) {
					res.json()
						.then(response => setVersion(response.version || '1.0'))
						.catch(console.log);
				}
			})
			.catch();
	}, [getToken]);

	return (
		<div className={clsx(classes.root)}>
			<Link to="/">
				<div className="flex items-center">
					<img className="logo-icon w-24 h-24" src="assets/images/logos/fuse.svg" alt="logo" />
					<Typography className="text-16 leading-none mx-12 font-medium logo-text" color="textSecondary">
						IQTRACK
					</Typography>
				</div>
			</Link>
			<div className={clsx(classes.reactBadge, 'react-badge flex items-center py-4 px-8 rounded')}>
				<span className="react-text text-12 mx-4">{`v${version}`}</span>
			</div>
		</div>
	);
}

export default Logo;
