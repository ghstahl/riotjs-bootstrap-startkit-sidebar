class RouteStore{

  constructor(){
    var self = this;
    riot.observable(self);
    self.bindEvents();
    self._initializeViewSet();
  }

  _initializeViewSet(){
    var self = this;
    self._viewsSet = new Set();
    var s = self._viewsSet;
    s.add('home');
    s.add('projects');
    riot.routeState.views = Array.from(s);
    riot.routeState.defaultView = 'home';
  }
  bindEvents(){
    var self = this;
    self.on('riot-route-dispatch', (route) => {
      console.log('riot-route-dispatch',route)
      riot.route(route)
      self.trigger('riot-route-dispatch-ack', route);
    });
    
    self.on('riot-route-add-view', (view) => {
      console.log('riot-route-add-view',view)
      var s = self._viewsSet;
      s.add(view);
      riot.routeState.views = Array.from(s);
    });

    self.on('riot-route-remove-view', (view) => {
      console.log('riot-route-remove-view',view)
      var s = self._viewsSet;
      s.delete(view);
      riot.routeState.views = Array.from(s);
    });
  }
}
export default RouteStore;