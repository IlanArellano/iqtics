import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import TableLoader from './TableComponents/TableLoader';
import NoRows from './TableComponents/NoRows';

export default function RouteTable({ rows, loading }) {
	const columns = [
		{ field: 'hora', headerName: 'Hora', width: 200, valueFormatter: ({ value }) => moment(value).format('LLL') },
		{ field: 'tipo', headerName: 'Tipo', width: 150 },
		{ field: 'geocerca', headerName: 'Geocerca', width: 150 },
		{
			field: 'mantenimientos',
			headerName: 'Mantenimientos',
			type: 'number',
			width: 150
		}
	];

	const tableRows = rows.map(row => {
		return {
			id: row.id,
			hora: row.serverTime,
			tipo: row.type,
			geocerca: row.geofence ? row.geofence : '',
			mantenimientos: row.maintenanceId ? row.maintenanceId : ''
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
