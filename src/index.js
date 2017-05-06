import 'bootswatch/slate/bootstrap.css';
import "./css/index.css";
import 'bootstrap';

import './event-helper';

// Put RiotControl first in the startup flow
import RiotControl from 'riotcontrol';
riot.control = RiotControl;
import './app.tag';

// Add the stores
////////////////////////////////////////////////////////
import RouteStore 					from './stores/RouteStore.js';
RiotControl.addStore(new RouteStore());

import RiotControlDispatcherStore 	from './stores/RiotControlDispatcherStore.js';
RiotControl.addStore(new RiotControlDispatcherStore());

import FetchStore 					from './stores/fetch-store.js';
RiotControl.addStore(new FetchStore());

import ProgressStore            	from './stores/progress-store.js';
RiotControl.addStore(new ProgressStore());

import LocalStorageStore         	from './stores/localstorage-store.js';
RiotControl.addStore(new LocalStorageStore());

import ItemStore 					from './stores/itemstore.js';
RiotControl.addStore(new ItemStore());

import TypicodeUserStore 			from './stores/typicode-user-store.js';
RiotControl.addStore(new TypicodeUserStore());

riot.mount('app');
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
RiotControl.trigger('riot-dispatch',riot.EVT.finalMount,'some data');
RiotControl.trigger('riot-dispatch','riot-route-dispatch-ack');



