import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
	table: {
		minWidth: '100%'
	},
	containTable: {
		width: '100%',
		marginLeft: '20px',
		color: '#000000'
	},
	option: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

export default function ResumeRoute() {
	const classes = useStyles();
	const [route, setRoute] = useState('');
	const [dispositivo, setDispositivo] = useState('');
	const [check, setCheck] = useState(false);

	const handleRoute = e => {
		setRoute(e.target.value);
	};

	const handleDevice = e => {
		setDispositivo(e.target.value);
	};

	const handleCheck = e => {
		setCheck(e.target.checked);
	};

	function createData(name, calories, fat, carbs, protein) {
		return { name, calories, fat, carbs, protein };
	}

	const rows = [
		createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
		createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
		createData('Eclair', 262, 16.0, 24, 6.0),
		createData('Cupcake', 305, 3.7, 67, 4.3),
		createData('1', 356, 16.0, 49, 3.9),
		createData('2', 356, 16.0, 49, 3.9),
		createData('3', 356, 16.0, 49, 3.9),
		createData('4', 356, 16.0, 49, 3.9),
		createData('5', 356, 16.0, 49, 3.9),
		createData('6', 356, 16.0, 49, 3.9),
		createData('7', 356, 16.0, 49, 3.9),
		createData('8', 356, 16.0, 49, 3.9),
		createData('9', 356, 16.0, 49, 3.9),
		createData('10', 356, 16.0, 49, 3.9),
		createData('11', 356, 16.0, 49, 3.9),
		createData('12', 356, 16.0, 49, 3.9),
		createData('13', 356, 16.0, 49, 3.9),
		createData('14', 356, 16.0, 49, 3.9),
		createData('15', 356, 16.0, 49, 3.9),
		createData('16', 356, 16.0, 49, 3.9),
		createData('17', 356, 16.0, 49, 3.9),
		createData('18', 356, 16.0, 49, 3.9),
		createData('19', 356, 16.0, 49, 3.9),
		createData('20', 356, 16.0, 49, 3.9)
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
					<div>
						<FormControlLabel
							control={
								<Checkbox
									checked={check}
									onChange={handleCheck}
									color="primary"
									inputProps={{ 'aria-label': 'secondary checkbox' }}
								/>
							}
							label="Resumen Diario"
						/>
					</div>
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
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell color="primary">Hora</TableCell>
								<TableCell align="right">Fecha de Inicio</TableCell>
								<TableCell align="right">Distancia</TableCell>
								<TableCell align="right">Odómetro Inicial</TableCell>
								<TableCell align="right">Odómetro Final</TableCell>
								<TableCell align="right">Velocidad Promedio</TableCell>
								<TableCell align="right">Velocidad Máxima</TableCell>
								<TableCell align="right">Horas Motor</TableCell>
								<TableCell align="right">Combustible consumido</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map(row => {
								return (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.fat}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}
