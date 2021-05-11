import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReportsModal from '../reports';

const useStyles = makeStyles(theme => ({
	color: {
		color: theme.palette.text.secondary
	}
}));

function UserPreferences(props) {
	const classes = useStyles();
	const [userMenu, setUserMenu] = useState(null);
	const [display, setDisplay] = useState('');
	const [open, setOpen] = useState(false);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const switchModal = name => {
		setOpen(true);
		setDisplay(name);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			{open && <ReportsModal display={display} open={open} setOpen={setOpen} />}
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex mx-4 items-end">
					<Typography component="span" className="font-semibold flex" color="textSecondary">
						<Icon>pages</Icon>
					</Typography>
					<Typography component="span" className="font-semibold flex" color="textSecondary">
						Reportes
					</Typography>
				</div>
			</Button>

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
				<MenuItem component={null} onClick={() => switchModal('Ruta')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>alt_route</Icon>
					</ListItemIcon>
					<ListItemText primary="Ruta" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchModal('Eventos')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>notifications_active</Icon>
					</ListItemIcon>
					<ListItemText primary="Eventos" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchModal('Viajes')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>play_circle_filled</Icon>
					</ListItemIcon>
					<ListItemText primary="Viajes" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchModal('Paradas')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>pause_circle_filled</Icon>
					</ListItemIcon>
					<ListItemText primary="Paradas" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchModal('Resumen')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>format_list_bulleted</Icon>
					</ListItemIcon>
					<ListItemText primary="Resumen" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchModal('Grafica')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>trending_up</Icon>
					</ListItemIcon>
					<ListItemText primary="Gráfica" className={classes.color} />
				</MenuItem>
			</Popover>
		</>
	);
}

export default UserPreferences;
