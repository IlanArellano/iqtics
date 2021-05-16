import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import RouteTable from './components/TableRoute';
import ReportFilter, { selectDate } from './services/Reports';
import getDevices from './services/getDevices';

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
	},
	load: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'center'
	}
}));

export default function ReportRoute() {
	const classes = useStyles();
	const [selectDevice, setSelectDevice] = useState([]);
	const [route, setRoute] = useState('');
	const [dispositivo, setDispositivo] = useState('Hoy');
	const [rows, setRows] = useState([]);
	const [from, setFrom] = useState(moment().subtract(1, 'hour'));
	const [to, setTo] = useState(moment());
	const [loading, setLoading] = useState(false);
	const [exportLoader, setExportLoader] = useState(false);

	const handleRoute = e => {
		setRoute(e.target.value);
	};

	const handleDevice = e => {
		setDispositivo(e.target.value);
	};

	const handleMostrar = async () => {
		setLoading(true);
		const Dateform = selectDate(dispositivo, from, to);
		console.log(route);
		console.log(Dateform);
		const reports = await ReportFilter({
			endPoint: 'route',
			deviceId: route,
			from: Dateform.from.toISOString(),
			to: Dateform.to.toISOString(),
			mail: false,
			type: 'json'
		});
		if (reports) {
			setRows(reports);
		}
		setLoading(false);
	};

	const handleExportar = async () => {
		setExportLoader(true);
		const Dateform = selectDate(dispositivo, from, to);
		const exportar = await ReportFilter({
			endPoint: 'route',
			deviceId: route,
			from: Dateform.from.toISOString(),
			to: Dateform.to.toISOString(),
			mail: false,
			type: 'export'
		});
		if (exportar.success) {
			setExportLoader(false);
		}
		if (exportar.error) {
			// eslint-disable-next-line no-alert
			alert(exportar.error);
			setExportLoader(false);
		}
	};

	useEffect(() => {
		const setDevices = async () => {
			const res = await getDevices();
			if (res.length) {
				setSelectDevice(res);
			} else {
				setSelectDevice([]);
			}
		};
		setDevices();
	}, []);

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
							{selectDevice.length > 0 ? (
								selectDevice.map(device => {
									return (
										<MenuItem key={device.id} value={device.id}>
											{device.name}
										</MenuItem>
									);
								})
							) : (
								<MenuItem value={1}>No content</MenuItem>
							)}
						</Select>
					</FormControl>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="Periodo" color="secondary">
							Periodo
						</InputLabel>
						<Select
							labelId="Periodo"
							id="Periodo"
							value={dispositivo}
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
				<div>
					{dispositivo === 'Personalizado' && (
						<>
							<TextField
								margin="normal"
								variant="filled"
								label="Desde"
								type="datetime-local"
								value={from.format(moment.HTML5_FMT.DATETIME_LOCAL)}
								onChange={e => setFrom(moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL))}
								fullWidth
							/>
							<TextField
								margin="normal"
								variant="filled"
								label="Desde"
								type="datetime-local"
								value={to.format(moment.HTML5_FMT.DATETIME_LOCAL)}
								onChange={e => setTo(moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL))}
								fullWidth
							/>
						</>
					)}
				</div>
				<FormControl className={classes.buttons}>
					<Button variant="outlined" color="primary" disabled={!route} onClick={() => handleMostrar()}>
						Mostrar
					</Button>
					<Button variant="outlined" disabled={!route} onClick={() => handleExportar()} color="primary">
						Exportar
					</Button>
					<Button variant="outlined" disabled={!route} color="primary">
						Reporte por correo
					</Button>
					<div className={classes.load}>{exportLoader && <CircularProgress />}</div>
				</FormControl>
			</div>
			<div className={classes.containTable}>
				<RouteTable rows={rows} loading={loading} />
			</div>
		</div>
	);
}
