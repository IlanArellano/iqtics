import { io } from 'socket.io-client';

const getToken = () => window.localStorage.getItem('userToken');

export default function socketController(endpoint) {
	const token = getToken();

	let url = process.env.REACT_APP_API_URL;
	const protocol = url.split(':')[0] === 'https' ? 'wss' : 'ws';
	if (url) {
		url = url.slice(7);
	}
	const socket = io(`${protocol}//${url}/api/socket/${endpoint}`);

	socket.on('connect', () => {
		console.log(socket.id);
	});
	socket.on('connect_error', () => {
		console.log('asdnsajdnsa');
	});
}
