// the hosting riot spa will put riot in the global window namespace.
var riot = window.riot;
import './css/index.css';
import TypicodeUserStore 			from 	'./stores/typicode-user-store.js';
import 										'./pages/my-component-page.tag';
import 										'./pages/typicode-user-detail.tag';

var registerRecord = {
	name:'typicode-component',
	views:[
		{view:'my-component-page'},
		{view:'typicode-user-detail'}
	],
	stores:[
		{store: new TypicodeUserStore()}
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


