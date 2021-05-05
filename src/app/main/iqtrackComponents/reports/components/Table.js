import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: '100%'
	},
	container: {
		minHeight: 400,
		maxHeight: 500,
		overflow: 'scroll'
	}
}));

export default function ReportTable({ columns }) {
	const classes = useStyles();

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
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							{columns.map((column, i) => {
								return (
									<TableCell align="center" key={i}>
										{column}
									</TableCell>
								);
							})}
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
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
