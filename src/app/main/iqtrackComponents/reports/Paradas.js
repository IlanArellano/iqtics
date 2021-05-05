import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ParadasTable from './components/Table';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	buttons: {
		minWidth: 280,
		margin: theme.spacing(1)
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	containTable: {
		width: '100%',
		marginLeft: '20px'
	},
	option: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

export default function ParadasRoute() {
	const classes = useStyles();
	const [route, setRoute] = useState('');
	const [dispositivo, setDispositivo] = useState('');

	const handleRoute = e => {
		setRoute(e.target.value);
	};

	const handleDevice = e => {
		setDispositivo(e.target.value);
	};

	const columns = [
		'Hora',
		'Hora de inicio',
		'Odómetro',
		'Hora de Fin',
		'Duración',
		'Horas motor',
		'Conmustible consumido'
	];

	return (
		<div className={classes.container}>
			<div className={classes.option}>
				<div>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="Dispositivos" color="secondary">
							Dispositivos
						</InputLabel>
						<Select
							labelId="Dispositivos"
							id="Dispositivos"
							value={route}
							onChange={handleRoute}
							label="Dispositivos"
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="Periodo" color="secondary">
							Periodo
						</InputLabel>
						<Select
							labelId="Periodo"
							id="Periodo"
							value={dispositivo || 'Hoy'}
							onChange={handleDevice}
							label="Periodo"
						>
							<MenuItem value="Hoy">Hoy</MenuItem>
							<MenuItem value="Ayer">Ayer</MenuItem>
							<MenuItem value="SemanaActual">Semana Actual</MenuItem>
							<MenuItem value="SemanaAnterior">Semana Anterior</MenuItem>
							<MenuItem value="MesActual">Mes Actual</MenuItem>
							<MenuItem value="MesAnterior">Mes Anterior</MenuItem>
							<MenuItem value="Personalizado">Personalizado</MenuItem>
						</Select>
					</FormControl>
				</div>
				<FormControl className={classes.buttons}>
					<Button variant="outlined" color="primary">
						Mostrar
					</Button>
					<Button variant="outlined" color="primary">
						Exportar
					</Button>
					<Button variant="outlined" color="primary">
						Reporte por correo
					</Button>
				</FormControl>
			</div>
			<div className={classes.containTable}>
				<ParadasTable columns={columns} />
			</div>
		</div>
	);
}
