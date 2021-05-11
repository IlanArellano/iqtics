import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useUser from 'app/main/iqtrackComponents/hooks/useUser';
import UserModal from '../../main/iqtrackComponents/userOptions';

const useStyles = makeStyles(theme => ({
	color: {
		color: theme.palette.text.secondary
	}
}));

function UserMenu(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [display, setDisplay] = useState('');

	const [userMenu, setUserMenu] = useState(null);
	const history = useHistory();
	const { logout } = useUser();

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const switchOpen = name => {
		setOpen(true);
		setDisplay(name);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	const handleLogOut = () => {
		logout();
		history.push('/login');
	};

	return (
		<>
			{open && <UserModal display={display} open={open} setOpen={setOpen} />}
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="font-semibold flex" color="textSecondary">
						Nombre
					</Typography>
					<Typography className="text-11 font-medium capitalize" color="textSecondary">
						Rol
					</Typography>
				</div>
				<Icon className={classes.color}>arrow_drop_down</Icon>
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
				<MenuItem component={null} onClick={() => switchOpen('Cuenta')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>person_outline</Icon>
					</ListItemIcon>
					<ListItemText primary="Cuenta" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchOpen('Notificaciones')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>notifications</Icon>
					</ListItemIcon>
					<ListItemText primary="Notificaciones" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchOpen('Grupos')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>help_outline</Icon>
					</ListItemIcon>
					<ListItemText primary="Grupos" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchOpen('Conductores')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>time_to_leave</Icon>
					</ListItemIcon>
					<ListItemText primary="Conductores" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchOpen('Atributos Calculados')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>storage</Icon>
					</ListItemIcon>
					<ListItemText primary="Atributos Calculados" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={handleLogOut} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>login</Icon>
					</ListItemIcon>
					<ListItemText primary="Salir" className={classes.color} />
				</MenuItem>
				<div className="my-24 flex items-center justify-center">
					<Divider className="w-32" />
					<span className={`mx-8 font-semibold ${classes.color}`}>ADMINISTRADOR</span>
					<Divider className="w-32" />
				</div>
				<MenuItem component={null} onClick={() => switchOpen('Servidor')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>dns</Icon>
					</ListItemIcon>
					<ListItemText primary="Servidor" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchOpen('Usuarios')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>people_alt</Icon>
					</ListItemIcon>
					<ListItemText primary="Usuarios" className={classes.color} />
				</MenuItem>
				<MenuItem component={null} onClick={() => switchOpen('Estadísticas')} role="button">
					<ListItemIcon className="min-w-40">
						<Icon>bar_chart</Icon>
					</ListItemIcon>
					<ListItemText primary="Estadísticas" className={classes.color} />
				</MenuItem>
			</Popover>
		</>
	);
}

export default UserMenu;
