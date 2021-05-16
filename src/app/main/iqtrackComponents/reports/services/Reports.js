import moment from 'moment';

const getUser = window.localStorage.getItem('userToken') ? window.localStorage.getItem('userToken') : null;

export default async function getReportFilter({ endPoint, deviceId, from, to, mail, type, event = null }) {
	const query = new URLSearchParams({ deviceId, from, to, mail });
	if (event && Array.isArray(event)) {
		event.forEach(it => query.append('type', it));
	}
	const res = await fetch(`https://${process.env.REACT_APP_API_URL}/api/reports/${endPoint}?${query.toString()}`, {
		headers: {
			Authorization: `Basic ${getUser}`,
			Accept:
				type === 'json'
					? 'application/json'
					: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		}
	});
	if (res.ok) {
		if (type === 'json') {
			const response = await res.json();
			return response;
		}
		if (type === 'export') {
			try {
				window.location.assign(window.URL.createObjectURL(await res.blob()));
				return {
					success: true
				};
			} catch (error) {
				return {
					error: `Ha ocurrido un error: ${error}`
				};
			}
		}
		return null;
	}
	return null;
}

export const selectDate = (dispositivo, from, to) => {
	switch (dispositivo) {
		case 'Hoy':
			return {
				from: moment().startOf('day'),
				to: moment().endOf('day')
			};
		case 'Ayer':
			return {
				from: moment().subtract(1, 'day').startOf('day'),
				to: moment().subtract(1, 'day').endOf('day')
			};
		case 'SemanaActual':
			return {
				from: moment().startOf('week'),
				to: moment().endOf('week')
			};
		case 'SemanaAnterior':
			return {
				from: moment().subtract(1, 'week').startOf('week'),
				to: moment().subtract(1, 'week').endOf('week')
			};
		case 'MesActual':
			return {
				from: moment().startOf('month'),
				to: moment().endOf('month')
			};
		case 'MesAnterior':
			return {
				from: moment().startOf('day'),
				to: moment().endOf('month')
			};

		default:
			return {
				from,
				to
			};
	}
};
