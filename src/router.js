import route from 'riot-route'
import './pages/home.tag'
import './pages/projects.tag'
 

// we need this to easily check the current route from every component
riot.route = route
riot.routeState = {
  view : ''
};

class Router{

  constructor(){
    this._initializeViewSet();
    riot.route(this._handleRoute.bind(this));
    riot.route.exec(this._handleRoute.bind(this));
  }
  

  addView(view){
    var s = this._viewsSet;
    s.add(view);
    this._views = Array.from(s);
  }
  removeView(view){
    var s = this._viewsSet;
    s.delete(view);
    this._views = Array.from(s);
  }
  _initializeViewSet(){
    this._viewsSet = new Set();
    this._currentView = null;
    this._views = [];
    this._defaultView = 'home';

    var s = this._viewsSet;
    s.add('home');
    s.add('projects');
    this._views = Array.from(s);
  }
  _handleRoute( ){

    var view = arguments[0];
     
    // load default view, if view is not in views list
    if(this._views.indexOf(view) === -1){
      return riot.route(this._defaultView);
    }

    this._loadView(view); 
  }

  _loadView(view){
    if (this._currentView) {
      this._currentView.unmount(true);
    }

    riot.routeState.view = view;
    this._currentView = riot.mount('#riot-app', view)[0];
  }

}
export default Router;
 