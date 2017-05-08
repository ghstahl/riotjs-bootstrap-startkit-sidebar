// the hosting riot spa will put riot in the global window namespace.
var riot = window.riot;
import './css/index.css';
import TypicodeUserStore 			from 	'./stores/typicode-user-store.js';
import 										'./pages/my-component-page.tag';
import 										'./pages/typicode-user-detail.tag';

riot.control.trigger('riot-contol-add-store',new TypicodeUserStore());
riot.control.trigger('typicode-init');
riot.control.trigger('riot-route-add-view','my-component-page');
riot.control.trigger('riot-route-add-view','typicode-user-detail');


