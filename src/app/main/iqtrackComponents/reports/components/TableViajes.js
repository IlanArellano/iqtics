import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import TableLoader from './TableComponents/TableLoader';
import NoRows from './TableComponents/NoRows';

export default function ViajesTable({ rows, loading }) {
	const columns = [
		{
			field: 'horaI',
			headerName: 'Hora de inicio',
			width: 200,
			valueFormatter: ({ value }) => moment(value).format('LLL')
		},
		{
			field: 'odometroI',
			headerName: 'Odómetro inicial',
			width: 200,
			type: 'number',
			valueFormatter: ({ value }) => `${value.toFixed(1)} Km`
		},
		{
			field: 'horaF',
			headerName: 'Hora final',
			width: 200,
			valueFormatter: ({ value }) => moment(value).format('LLL')
		},
		{
			field: 'odometroF',
			headerName: 'Odómetro final',
			width: 200,
			type: 'number',
			valueFormatter: ({ value }) => `${value.toFixed(1)} Km`
		},
		{
			field: 'distancia',
			headerName: 'Distancia',
			width: 200,
			type: 'number',
			valueFormatter: ({ value }) => `${value.toFixed(1)} Km`
		},
		{
			field: 'velocidadP',
			headerName: 'Velocidad promedio',
			width: 200,
			type: 'number',
			valueFormatter: ({ value }) => `${value.toFixed(1)} Km/h`
		},
		{
			field: 'velocidadM',
			headerName: 'Velocidad Máxima',
			width: 200,
			type: 'number',
			valueFormatter: ({ value }) => `${value.toFixed(1)} Km/h`
		},
		{
			field: 'duracion',
			headerName: 'Duración',
			width: 200,
			type: 'number',
			valueFormatter: ({ value }) => `${Math.floor(value / 60000)} minutos`
		}
	];

	const tableRows = rows.map(row => {
		return {
			id: Math.random(),
			horaI: row.startTime,
			odometroI: row.startOdometer,
			horaF: row.endTime,
			odometroF: row.endOdometer,
			distancia: row.distance,
			velocidadP: row.averageSpeed,
			velocidadM: row.maxSpeed,
			duracion: row.duration
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
