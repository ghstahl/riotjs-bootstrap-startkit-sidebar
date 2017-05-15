// the hosting riot spa will put riot in the global window namespace.
var riot = window.riot;
import './css/index.css';
import TypicodeUserStore 			from 	'./stores/typicode-user-store.js';
import RouteContributionStore 		from 	'./stores/route-contribution-store.js';
import 										'./pages/my-component-page.tag';
import 										'./pages/typicode-user-detail.tag';
import 										'./pages/home.tag';

var registerRecord = {
	name:'typicode-component',
	views:[
		{ title : 'My Component', route : '/my-component-page/home'}
	],
	stores:[
		{store: new TypicodeUserStore()},
		{store: new RouteContributionStore()}
	],
	postLoadEvents:[
		{event:'typicode-init',data:{}}
	],
	preUnloadEvents:[
		{event:'typicode-uninit',data:{}}
	]
};

riot.control.trigger('plugin-registration',registerRecord);
riot.control.trigger('component-load-complete',registerRecord.name);


