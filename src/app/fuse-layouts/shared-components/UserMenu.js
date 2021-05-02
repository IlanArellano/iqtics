import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="font-semibold flex">
						{user.data.displayName}
					</Typography>
					<Typography className="text-11 font-medium capitalize" color="textSecondary">
						{user.role.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
					</Typography>
				</div>

				{user.data.photoURL ? (
					<Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
				) : (
					<Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
				)}
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
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_outline</Icon>
							</ListItemIcon>
							<ListItemText primary="Cuenta" />
						</MenuItem>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>notifications</Icon>
							</ListItemIcon>
							<ListItemText primary="Notificaciones" />
						</MenuItem>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>help_outline</Icon>
							</ListItemIcon>
							<ListItemText primary="Grupos" />
						</MenuItem>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>time_to_leave</Icon>
							</ListItemIcon>
							<ListItemText primary="Conductores" />
						</MenuItem>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>storage</Icon>
							</ListItemIcon>
							<ListItemText primary="Atributos Calculados" />
						</MenuItem>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>login</Icon>
							</ListItemIcon>
							<ListItemText primary="Salir" />
						</MenuItem>
						<div className="my-24 flex items-center justify-center">
							<Divider className="w-32" />
							<span className="mx-8 font-semibold">ADMINISTRADOR</span>
							<Divider className="w-32" />
						</div>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>dns</Icon>
							</ListItemIcon>
							<ListItemText primary="Servidor" />
						</MenuItem>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>people_alt</Icon>
							</ListItemIcon>
							<ListItemText primary="Usuarios" />
						</MenuItem>
						<MenuItem component={Link} to="/logout" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>bar_chart</Icon>
							</ListItemIcon>
							<ListItemText primary="Estadísticas" />
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>account_circle</Icon>
							</ListItemIcon>
							<ListItemText primary="My Profile" />
						</MenuItem>
						<MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</MenuItem>
						<MenuItem
							onClick={() => {
								dispatch(logoutUser());
								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
