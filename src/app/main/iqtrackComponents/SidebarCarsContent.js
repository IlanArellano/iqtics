import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

export default function SidebarCarsContent() {
	return (
		<>
			<div id="Carros" className="flex justify-between items-center">
				<Icon>drive_eta</Icon>
				<div className="hidden md:flex flex-col">
					<Typography component="span" className="font-semibold flex">
						Nombre
					</Typography>
					<Typography className="text-11 font-medium capitalize" color="textSecondary">
						Número de rastreo
					</Typography>
				</div>
				<IconButton>
					<Icon>menu</Icon>
				</IconButton>
			</div>
		</>
	);
}
