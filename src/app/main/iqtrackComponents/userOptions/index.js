import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Cuenta from './Cuenta';
import Grupos from './Grupos';
import Users from './admin/Users';

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		minWidth: '80vw',
		minHeight: '50vh',
		maxHeight: '90vh',
		backgroundColor: '#ffffff',
		border: '2px solid #000',
		boxShadow: theme.shadows[5]
	},
	content: {
		padding: theme.spacing(2, 4, 3)
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: theme.palette.primary.dark
	}
}));

function OptionsModal({ display, open, setOpen }) {
	const classes = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	const SetDisplay = () => {
		switch (display) {
			case 'Cuenta':
				return <Cuenta />;
			case 'Notificaciones':
				return <Cuenta />;
			case 'Grupos':
				return <Grupos />;
			case 'Conductores':
				return <Cuenta />;
			case 'Atributos Calculados':
				return <Cuenta />;
			case 'Servidor':
				return <Cuenta />;
			case 'Usuarios':
				return <Users />;
			case 'Estadísticas':
				return <Cuenta />;
			default:
				return <div>Error</div>;
		}
	};

	return (
		<Modal open={open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
			<div
				style={{
					top: `50%`,
					left: `50%`,
					transform: `translate(-50%, -50%)`
				}}
				className={classes.paper}
			>
				<div className={classes.header}>
					<h3 style={{ color: '#ffffff', marginLeft: '15px' }}>{display}</h3>
					<IconButton onClick={() => handleClose()}>
						<Icon style={{ fontSize: 30, color: 'red' }}>cancel</Icon>
					</IconButton>
				</div>
				<div className={classes.content}>
					<SetDisplay />
				</div>
			</div>
		</Modal>
	);
}

export default function ModalPortal({ display, open, setOpen }) {
	return ReactDOM.createPortal(
		<OptionsModal display={display} open={open} setOpen={setOpen} />,
		document.getElementById('Modals')
	);
}
