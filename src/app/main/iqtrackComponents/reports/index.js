import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Ruta from './Route';
import Eventos from './Events';
import Viajes from './Viajes';
import Paradas from './Paradas';
import Resumen from './Resume';
import Grafica from './Grafica';

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		minwidth: '70%',
		maxHeight: '75vh',
		backgroundColor: '#000000',
		border: '2px solid #000',
		boxShadow: theme.shadows[5]
	},
	content: {
		padding: theme.spacing(2, 4, 3)
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}));

function ReportsModal({ display, open, setOpen }) {
	const classes = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	const SetDisplay = () => {
		switch (display) {
			case 'Ruta':
				return <Ruta />;
			case 'Eventos':
				return <Eventos />;
			case 'Viajes':
				return <Viajes />;
			case 'Paradas':
				return <Paradas />;
			case 'Resumen':
				return <Resumen />;
			case 'Grafica':
				return <Grafica />;
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
					transform: `translate(-50%, -50%)`,
					overflow: 'scroll'
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
		<ReportsModal display={display} open={open} setOpen={setOpen} />,
		document.getElementById('Modals')
	);
}
