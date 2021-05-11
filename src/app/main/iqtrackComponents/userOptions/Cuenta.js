import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 360,
		backgroundColor: '#ffffff',
		margin: '0 auto',
		border: '1px solid #000000',
		padding: theme.spacing(4),
		maxHeight: 360,
		overflow: 'scroll'
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	inputs: {
		width: '100%'
	}
}));

export default function Ceunta() {
	const classes = useStyles();
	const [openO, setOpenO] = React.useState(true);
	const [openP, setOpenP] = React.useState(false);
	const [openPE, setOpenPE] = React.useState(false);
	const [checkD, setCheckD] = React.useState(false);
	const [checkA, setCheckA] = React.useState(false);
	const [checkSL, setCheckSL] = React.useState(false);
	const [checkDSL, setCheckDSL] = React.useState(false);
	const [checkLC, setCheckLC] = React.useState(false);

	const handleClick = () => {
		setOpenP(false);
		setOpenPE(false);
		setOpenO(!openO);
	};

	const handleClickP = () => {
		setOpenO(false);
		setOpenPE(false);
		setOpenP(!openP);
	};

	const handleClickPE = () => {
		setOpenO(false);
		setOpenP(false);
		setOpenPE(!openPE);
	};

	const handleCheckD = e => {
		setCheckD(e.target.checked);
	};

	const handleCheckA = e => {
		setCheckA(e.target.checked);
	};

	const handleCheckSL = e => {
		setCheckSL(e.target.checked);
	};

	const handleCheckDSL = e => {
		setCheckDSL(e.target.checked);
	};

	const handleCheckLC = e => {
		setCheckLC(e.target.checked);
	};

	return (
		<div className={classes.content}>
			<List component="nav" aria-labelledby="nested-list-subheader">
				<ListItem button onClick={handleClick}>
					<ListItemText primary="Obligatorio" />
					{openO ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openO} timeout="auto">
					<List component="div" disablePadding>
						<form noValidate autoComplete="off">
							<TextField id="Nombre" className={classes.inputs} label="Nombre:" variant="outlined" />
							<TextField id="Email" className={classes.inputs} label="Email:" variant="outlined" />
							<TextField
								id="Contraseña"
								className={classes.inputs}
								type="password"
								label="Contraseña:"
								variant="outlined"
							/>
						</form>
					</List>
				</Collapse>
				<ListItem button onClick={handleClickP}>
					<ListItemText primary="Preferencias" />
					{openP ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openP} timeout="auto">
					<List component="div" disablePadding>
						<form noValidate autoComplete="off">
							<TextField
								id="Direccion"
								className={classes.inputs}
								label="Dirección:"
								variant="outlined"
							/>
							<TextField id="Telefono" className={classes.inputs} label="Teléfono:" variant="outlined" />
							<TextField
								id="FechaI"
								className={classes.inputs}
								label="Fecha de ingreso:"
								variant="outlined"
							/>
							<FormControl variant="outlined" className={classes.inputs}>
								<InputLabel id="Pago" color="secondary">
									Forma de Pago
								</InputLabel>
								<Select labelId="Pago" id="Pago" value="Hoy" label="Forma de Pago">
									<MenuItem value="Hoy">Semanal</MenuItem>
									<MenuItem value="Hoy">Mensual</MenuItem>
									<MenuItem value="Hoy">Anual</MenuItem>
								</Select>
							</FormControl>
							<TextField
								id="FechaF"
								className={classes.inputs}
								label="Próxima fecha de pago"
								variant="outlined"
							/>
						</form>
					</List>
				</Collapse>
				<ListItem button onClick={handleClickPE}>
					<ListItemText primary="Permisos" />
					{openPE ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openPE} timeout="auto">
					<List component="div" disablePadding>
						<form noValidate autoComplete="off">
							<FormControlLabel
								control={
									<Checkbox
										checked={checkD}
										onChange={handleCheckD}
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
								}
								label="Deshabilitado"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={checkA}
										onChange={handleCheckA}
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
								}
								label="Administrador"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={checkSL}
										onChange={handleCheckSL}
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
								}
								label="Sólo Lectura"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={checkDSL}
										onChange={handleCheckDSL}
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
								}
								label="Dispositivo de Sólo Lectura"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={checkLC}
										onChange={handleCheckLC}
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
								}
								label="Limitar Comandos"
							/>
							<TextField id="FechaV" className={classes.inputs} label="Vencimiento" variant="outlined" />
							<TextField
								id="LimiteD"
								type="number"
								className={classes.inputs}
								label="Límite del dispositivo:"
								variant="outlined"
							/>
							<TextField
								id="LimiteU"
								type="number"
								className={classes.inputs}
								label="Límite del usuario:"
								variant="outlined"
							/>
							<TextField id="Simbolo" className={classes.inputs} label="Símbolo:" variant="outlined" />
						</form>
					</List>
				</Collapse>
			</List>
		</div>
	);
}
