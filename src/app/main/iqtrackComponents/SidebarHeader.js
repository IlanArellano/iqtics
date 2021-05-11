import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
	input: {
		padding: '7px 0'
	},
	content: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

export default function SidebarHeader() {
	const classes = useStyles();

	return (
		<div id="Iconos" className={classes.content}>
			<div className="flex justify-center items-center">
				<Tooltip title="Agregar nuevo dispositivo" aria-label="add" placement="top" arrow>
					<IconButton>
						<Icon>add</Icon>
					</IconButton>
				</Tooltip>
			</div>
			<div className="flex justify-between items-center">
				<form>
					<input type="text" name="search" className={classes.input} placeholder="Buscar un auto" />
					<IconButton type="submit">
						<Icon>search</Icon>
					</IconButton>
				</form>
			</div>
		</div>
	);
}
