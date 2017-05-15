// event names

riot.EVT = {
	app:{
		out:{
			appMount: 'app-mount',
			appUnmount: 'app-unmount'
		}
	},
	loadItems : 'load_items',
	loadItemsSuccess : 'load_items_success',

	contributeRoutes: 'contribute-routes',
	contributeCatchAllRoute: 'contribute-catchall-route',
	loadView:'riot-route-load-view',
	routeDispatch:'riot-route-dispatch',
	routeDispatchAck:'riot-route-dispatch-ack'
}
