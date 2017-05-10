import 'bootswatch/slate/bootstrap.css';
import "./css/index.css";
import 'bootstrap';

import './event-helper';

riot.state = {
	sidebar:{
		touch:0,
		items:[
			{ title : 'Home', view : 'home'},
			{ title : 'Projects', view : 'projects'}
		]
	}
};
// Put RiotControl first in the startup flow
import RiotControl from 'riotcontrol';
riot.control = RiotControl;
window.riot = riot;

import './app.tag';

// Add the stores
////////////////////////////////////////////////////////
import RiotControlStore 			from './stores/RiotControlStore.js';
riot.control.addStore(new RiotControlStore());

import RouteStore 					from './stores/RouteStore.js';
riot.control.addStore(new RouteStore());

import DynamicJsCssLoaderStore 		from './stores/dynamic-jscss-loader-store.js';
riot.control.addStore(new DynamicJsCssLoaderStore());

import ComponentLoaderStore 		from './stores/component-loader-store.js';
riot.control.addStore(new ComponentLoaderStore());

import PluginRegistrationStore 		from './stores/plugin-registration-store.js';
riot.control.addStore(new PluginRegistrationStore());

import RiotControlDispatcherStore 	from './stores/RiotControlDispatcherStore.js';
riot.control.addStore(new RiotControlDispatcherStore());

import FetchStore 					from './stores/fetch-store.js';
riot.control.addStore(new FetchStore());

import ProgressStore            	from './stores/progress-store.js';
riot.control.addStore(new ProgressStore());

import LocalStorageStore         	from './stores/localstorage-store.js';
riot.control.addStore(new LocalStorageStore());

import ItemStore 					from './stores/itemstore.js';
riot.control.addStore(new ItemStore());

import SidebarStore 				from './stores/sidebar-store.js';
riot.control.addStore(new SidebarStore());

var testComponent = {
        key:'typicode-component',
        path:'/partial/bundle.js',
        type:'js',
        trigger:{
          onLoad:[{
              event:'sidebar-add-item',
              data:{
                title : 'My Components Page', 
                view : 'my-component-page' 
              }
            }
          ],
          onUnload:[{
              event:'sidebar-remove-item',
              data:{title : 'My Components Page'}
            },{
              event:'plugin-unregistration',
              data:{name:'riotjs-partial-spa'}
            }
          ]
        },
        state:{loaded:false}
      };

riot.control.trigger('init-component-loader-store');
riot.control.trigger('add-dynamic-component',testComponent);
	
riot.mount('app');

//riot.control.trigger('dynamic-jscss-loader-init');
// put Router Last
////////////////////////////////////////////////////////
import Router 		from './router.js';
riot.router = new Router();

// Finally dispatch the first event.
////////////////////////////////////////////////////////
// NOTE: DON'T DO the following;
//		RiotControl.trigger(riot.EVT.finalMount,'data');
// REASON: 
//      RiotControl events need to go to stores, and if you directly send the event to a tag
//      you will get as many callbacks to the tag as there were stores.  If you have 3 random stores, which
//      have nothing to do with the riot.EVT.finalMount event, you will still get 3 calls to the handler.
// SOLUTION:
// 		Send the event to the store, and in my case I send it to what is basically a middleman dispatcher.  My 
//      dispatcher forwards on the riot.EVT.finalMount.  Only one handler and only one time.
////////////////////////////////////////////////////////
riot.control.trigger('riot-dispatch',riot.EVT.finalMount,'some data');
riot.control.trigger('riot-dispatch','riot-route-dispatch-ack');


riot.route.start(true);


