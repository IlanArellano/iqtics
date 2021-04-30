import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default function SidebarHeader() {
	return (
		<>
			<div id="Iconos" className="flex justify-between items-center">
				<IconButton>
					<Icon>add</Icon>
				</IconButton>
			</div>
			<form>
				<input type="text" name="search" placeholder="Buscar un auto" />
				<IconButton>
					<Icon>search</Icon>
				</IconButton>
			</form>
		</>
	);
}
