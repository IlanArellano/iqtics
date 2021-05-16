import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import TableLoader from './TableComponents/TableLoader';
import NoRows from './TableComponents/NoRows';

export default function RouteTable({ rows, loading }) {
	const columns = [
		{ field: 'hora', headerName: 'Hora', width: 200, valueFormatter: ({ value }) => moment(value).format('LLL') },
		{ field: 'latitud', headerName: 'Latitud', width: 150 },
		{ field: 'longitud', headerName: 'Longitud', width: 150 },
		{
			field: 'velocidad',
			headerName: 'Velocidad',
			type: 'number',
			width: 150
		},
		{
			field: 'direccion',
			headerName: 'Dirección',
			width: 200
		}
	];

	const tableRows = rows.map(row => {
		return {
			id: row.id,
			hora: row.deviceTime,
			latitud: row.latitude,
			longitud: row.longitude,
			velocidad: row.speed,
			direccion: row.address
		};
	});

	return (
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={tableRows && tableRows.length > 0 ? tableRows : []}
				columns={columns}
				components={{
					LoadingOverlay: TableLoader,
					NoRowsOverlay: NoRows
				}}
				loading={loading}
				hideFooter={false}
			/>
		</div>
	);
}
