import { authRoles } from 'app/auth';
<<<<<<< HEAD
import Login from '../pages/auth/login-3/';
=======
import Login from '../pages/auth/login-3/Login3Page';
>>>>>>> 110f1e1 (version 1)

const LoginConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/login',
			component: Login
		}
	]
};

export default LoginConfig;
