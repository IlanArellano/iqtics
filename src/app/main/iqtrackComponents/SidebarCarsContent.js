/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import useUser from './hooks/useUser';

const useStyles = makeStyles(theme => ({
	color: {
		color: theme.palette.text.secondary
	}
}));

export default function SidebarCarsContent() {
	const { getToken } = useUser();
	const classes = useStyles();
	const [userMenu, setUserMenu] = useState(null);
	const [devices, setDevices] = useState([]);

	useEffect(() => {
		fetch(`https://${process.env.REACT_APP_API_URL}/api/devices`, {
			headers: new Headers({
				Authorization: `Basic ${getToken()}`,
				'Content-Type': 'application/json'
			})
		})
			.then(res => {
				if (res.ok && res.status === 200) {
					res.json()
						.then(response => setDevices(response))
						.catch(console.log);
				}
			})
			.catch(console.log);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};
	return (
		<>
			{devices.length > 0 ? (
				devices.map(device => {
					return (
						<div className="flex justify-between items-center" key={device.id}>
							<Icon>drive_eta</Icon>
							<div className="md:flex flex-col">
								<Typography component="span" className="font-semibold flex">
									{device.name}
								</Typography>
								<Typography className="text-11 font-medium capitalize" color="textSecondary">
									{device.uniqueId}
								</Typography>
							</div>
							<IconButton onClick={userMenuClick}>
								<Icon>menu</Icon>
							</IconButton>

							<Popover
								open={Boolean(userMenu)}
								anchorEl={userMenu}
								onClose={userMenuClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center'
								}}
								classes={{
									paper: 'py-8'
								}}
							>
								<MenuItem component={null} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>create</Icon>
									</ListItemIcon>
									<ListItemText primary="Editar" className={classes.color} />
								</MenuItem>
								<MenuItem component={null} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>delete</Icon>
									</ListItemIcon>
									<ListItemText primary="Eliminar" className={classes.color} />
								</MenuItem>
								<MenuItem component={null} role="button">
									<ListItemIcon className="min-w-40">
										<Icon>alt_route</Icon>
									</ListItemIcon>
									<ListItemText primary="Reproducir Ruta" className={classes.color} />
								</MenuItem>
							</Popover>
						</div>
					);
				})
			) : (
				<div>No hay Vehiculos</div>
			)}
		</>
	);
}
