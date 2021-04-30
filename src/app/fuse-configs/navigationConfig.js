import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'inicio',
		title: 'Inicio',
		translate: 'iqtrack',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'mapa',
				title: 'Mapa',
				translate: 'iqtrack',
				type: 'item',
				icon: 'map',
				url: '/apps/calendar'
			},
			{
				id: 'replay',
				title: 'Replay',
				translate: 'REPLAY',
				type: 'item',
				icon: 'replay',
				url: '/apps/calendar'
			}
		]
	},
	{
		id: 'reportes',
		title: 'Reportes',
		type: 'group',
		icon: 'pages',
		children: [
			{
				id: 'ruta',
				title: 'Ruta',
				type: 'item',
				icon: 'alt_route',
				url: '/pages/coming-soon'
			},
			{
				id: 'eventos',
				title: 'Eventos',
				type: 'item',
				icon: 'notifications_active',
				url: '/pages/coming-soon'
			},
			{
				id: 'viajes',
				title: 'Viajes',
				type: 'item',
				icon: 'play_circle_filled',
				url: '/pages/coming-soon'
			},
			{
				id: 'paradas',
				title: 'Paradas',
				type: 'item',
				icon: 'pause_circle_filled',
				url: '/pages/coming-soon'
			},
			{
				id: 'resumen',
				title: 'Resumen',
				type: 'item',
				icon: 'format_list_bulleted',
				url: '/pages/coming-soon'
			},
			{
				id: 'grafica',
				title: 'Gráfica',
				type: 'item',
				icon: 'trending_up',
				url: '/pages/coming-soon'
			}
		]
	},
	{
		id: 'preferencias',
		title: 'Preferencias',
		type: 'group',
		icon: 'web',
		children: [
			{
				id: 'cuenta',
				title: 'Cuenta',
				type: 'item',
				icon: 'person_outline',
				url: '/ui/icons'
			},
			{
				id: 'notificaciones',
				title: 'Notificaciones',
				type: 'item',
				icon: 'notifications',
				url: '/ui/typography'
			},
			{
				id: 'grupos',
				title: 'Grupos',
				type: 'item',
				icon: 'help_outline',
				url: '/ui/helper-classes'
			},
			{
				id: 'conductores',
				title: 'Conductores',
				type: 'item',
				icon: 'time_to_leave',
				url: '/ui/helper-classes'
			},
			{
				id: 'attr-calculados',
				title: 'Atributos Calculados',
				type: 'item',
				icon: 'storage',
				url: '/ui/helper-classes'
			}
		]
	},
	{
		id: 'administrador',
		title: 'Administrador',
		type: 'group',
		icon: 'verified_user',
		children: [
			{
				id: 'servidor',
				title: 'Servidor',
				type: 'item',
				url: '/login',
				auth: authRoles.onlyGuest,
				icon: 'dns'
			},
			{
				id: 'usuarios',
				title: 'Usuarios',
				type: 'item',
				url: '/register',
				auth: authRoles.onlyGuest,
				icon: 'people_alt'
			},
			{
				id: 'estadisticas',
				title: 'Estadísticas',
				type: 'item',
				auth: authRoles.user,
				url: '/logout',
				icon: 'bar_chart'
			}
		]
	}
];

export default navigationConfig;
