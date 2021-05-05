import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	typography: {
		padding: theme.spacing(2)
	},
	button: {
		background: '#ffffff',
		padding: '5px'
	},
	icon: {
		color: '#000000'
	},
	title: {
		fontWeight: 'bold'
	},
	a: {
		textAlign: 'center'
	},
	popoverContain: {
		margin: 3
	}
}));

export default function MapIcon() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<IconButton className={classes.button} onClick={handleClick}>
				<Icon className={classes.icon}>drive_eta</Icon>
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				<div className={classes.popoverContain}>
					<Typography>
						<span className={classes.title}>Estado:</span>online
					</Typography>
					<br />
					<Typography>
						<span className={classes.title}>Ubicación:</span> 19.69895, -101.20611
					</Typography>
					<br />
					<Typography>
						<span className={classes.title}>Velocidad:</span> 0.0
					</Typography>
					<br />
					<Typography>
						<span className={classes.title}>Curso:</span> 0.0
					</Typography>
					<br />
					<Typography>
						<span className={classes.title}>Distancia:</span> 0.00 Km
					</Typography>
					<br />
					<a href="#/" className={classes.a}>
						Más detalles
					</a>
				</div>
			</Popover>
		</div>
	);
}
