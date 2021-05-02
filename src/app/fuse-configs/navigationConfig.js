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
				translate: 'Mapa',
				type: 'item',
				icon: 'map',
				url: '/app/iqtics/map'
			},
			{
				id: 'replay',
				title: 'Replay',
				translate: 'REPLAY',
				type: 'item',
				icon: 'replay',
				url: '/app/iqtics/replay'
			}
		]
	}
];

export default navigationConfig;
