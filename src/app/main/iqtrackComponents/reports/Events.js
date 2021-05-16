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
import getDevices from './services/getDevices';
import ReportFilter, { selectDate } from './services/Reports';
import EventTable from './components/TableEvent';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex'
	},
	formControl: {
		margin: theme.spacing(1),
		width: 120
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

export default function EventRoute() {
	const classes = useStyles();
	const [route, setRoute] = useState('');
	const [dispositivo, setDispositivo] = useState('Hoy');
	const [event, setEvent] = useState(['allEvents']);
	const [selectEvent, setSelectEvent] = useState([]);
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

	const handleEvent = e => {
		setEvent(e.target.value);
	};

	const handleMostrar = async () => {
		setLoading(true);
		const Dateform = selectDate(dispositivo, from, to);
		const reports = await ReportFilter({
			endPoint: 'events',
			deviceId: route,
			from: Dateform.from.toISOString(),
			to: Dateform.to.toISOString(),
			mail: false,
			type: 'json',
			event
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
			endPoint: 'events',
			deviceId: route,
			from: Dateform.from.toISOString(),
			to: Dateform.to.toISOString(),
			mail: false,
			type: 'export',
			event
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
				setSelectEvent(res);
			} else {
				setSelectEvent([]);
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
							{selectEvent.length > 0 ? (
								selectEvent.map(device => {
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
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="Evento" color="secondary">
							Tipo de Evento
						</InputLabel>
						<Select
							labelId="Evento"
							id="Evento"
							value={event}
							onChange={handleEvent}
							label="Tipo de evento"
							multiple
						>
							<MenuItem value="allEvents">Todos los dispositivos</MenuItem>
							<MenuItem value="deviceOnline">Dispositivos de entrada</MenuItem>
							<MenuItem value="deviceUnknown">El estado del dispositivo es Desconocido</MenuItem>
							<MenuItem value="deviceOffline">El dispositivo está fuera de línea</MenuItem>
							<MenuItem value="deviceInactive">Dispositivo Inactivo</MenuItem>
							<MenuItem value="deviceMoving">Dispositivo está en movimiento</MenuItem>
							<MenuItem value="deviceStopped">El dispositivo se ha detenido</MenuItem>
							<MenuItem value="deviceOverspeed">
								El dispositivo ha excedido el limite de velocidad
							</MenuItem>
							<MenuItem value="deviceFuelDrop">Perdida de combustible</MenuItem>
							<MenuItem value="commandResult">Resultado de comando</MenuItem>
							<MenuItem value="geofenceEnter">El dispositivo ha entrado en la geocerca</MenuItem>
							<MenuItem value="geofenceExit">El dispositivo ha salido de la geocerca</MenuItem>
							<MenuItem value="alarm">Alarma</MenuItem>
							<MenuItem value="ignitionOn">Encendido ON</MenuItem>
							<MenuItem value="ignitionOff">Encendido OFF</MenuItem>
							<MenuItem value="maintenance">Requiere Mantenimiento</MenuItem>
							<MenuItem value="textMessage">Mensaje de texto recibido</MenuItem>
							<MenuItem value="driverChanged">El conductor ha cambiado</MenuItem>
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
					<Button variant="outlined" color="primary" disabled={!route} onClick={() => handleExportar()}>
						Exportar
					</Button>
					<Button variant="outlined" color="primary" disabled={!route}>
						Reporte por correo
					</Button>
					<div className={classes.load}>{exportLoader && <CircularProgress />}</div>
				</FormControl>
			</div>
			<div className={classes.containTable}>
				<EventTable rows={rows} loading={loading} />
			</div>
		</div>
	);
}
