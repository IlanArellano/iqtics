import { lazy } from 'react';
import Map from 'app/main/iqtrackComponents/ProtectMap';
import MapContent from './left-sidebar-2';

const simpleLayoutRoutes = [
	{
		path: '/ui/page-layouts/simple/full-width',
		component: lazy(() => import('./full-width'))
	},
	{
		path: '/ui/page-layouts/simple/left-sidebar',
		component: lazy(() => import('./left-sidebar'))
	},
	{
		path: '/app/iqtics/map',
		component: () => (
			<Map>
				<MapContent />
			</Map>
		)
	},
	{
		path: '/ui/page-layouts/simple/left-sidebar-3',
		component: lazy(() => import('./left-sidebar-3'))
	},
	{
		path: '/ui/page-layouts/simple/right-sidebar',
		component: lazy(() => import('./right-sidebar'))
	},
	{
		path: '/ui/page-layouts/simple/right-sidebar-2',
		component: lazy(() => import('./right-sidebar-2'))
	},
	{
		path: '/ui/page-layouts/simple/right-sidebar-3',
		component: lazy(() => import('./right-sidebar-3'))
	},
	{
		path: '/ui/page-layouts/simple/tabbed',
		component: lazy(() => import('./tabbed'))
	}
];

export default simpleLayoutRoutes;
