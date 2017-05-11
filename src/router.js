import route from 'riot-route'
import './pages/home.tag'
import './pages/projects.tag'
 



class Router{

  constructor(){
    var self = this;
    // we need this to easily check the current route from every component
    riot.route = route
    riot.routeState.view  = '';
    riot.route(self._handleRoute.bind(self));
    riot.route.exec(self._handleRoute.bind(self));
  }
  

  
  _handleRoute( ){
    var self = this;

    var view = arguments[0];
     
    // load default view, if view is not in views list
    if(riot.routeState.views.indexOf(view) === -1){
      return riot.route(riot.routeState.defaultView);
    }

    self._loadView(view); 
  }

  _loadView(view){
    var self = this;
    if (self._currentView) {
      self._currentView.unmount(true);
    }

    riot.routeState.view = view;
    self._currentView = riot.mount('#riot-app', view)[0];
  }

}
export default Router;
 