class RouteStore{

  constructor(){
    var self = this;
    self.name = "RouteStore";
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
    self.views = Array.from(s);
    self.defaultRoute = '/main/home/';
  }
  bindEvents(){
    var self = this;

    self.on(riot.EVT.contributeCatchAllRoute, (r) => {
      console.log(self.name,riot.EVT.contributeRoutes,r)
     r( ()=>{
        console.log('route handler of /  ' )
        riot.control.trigger(riot.EVT.routeDispatch,self.defaultRoute);
      }) 
    });

    self.on(riot.EVT.contributeRoutes, (r) => {
      console.log(self.name,riot.EVT.contributeRoutes,r)
      r('/main/*', (name)=>{
        console.log('route handler of /main/' + name)
        var view = name;
        if(self.views.indexOf(view) === -1){
          riot.control.trigger(riot.EVT.routeDispatch,self.defaultRoute);
        }else{
          riot.control.trigger(riot.EVT.loadView,view);
        }
        });
      r('/main', ()=>{
        console.log('route handler of /main  ')
        riot.control.trigger(riot.EVT.routeDispatch,self.defaultRoute);
      });
    });

    self.on(riot.EVT.routeDispatch, (route) => {
      console.log(self.name,riot.EVT.routeDispatch,route)
      riot.route(route)
      self.trigger(riot.EVT.routeDispatchAck, route);
    });

    self.on('route-catchall-reset', () => {
      console.log(self.name,'route-catchall-reset')
      riot.router.resetCatchAll();
    });

    self.on('riot-route-add-view', (view) => {
      console.log(self.name,'riot-route-add-view',view)
      var s = self._viewsSet;
      s.add(view);
      riot.routeState.views = Array.from(s);
    });

    self.on('riot-route-remove-view', (view) => {
      console.log(self.name,'riot-route-remove-view',view)
      var s = self._viewsSet;
      s.delete(view);
      riot.routeState.views = Array.from(s);
    });
    self.on('riot-route-load-view', (view) => {
      console.log(self.name,'riot-route-load-view',view)
      riot.router.loadView(view);
    });
  }
}
export default RouteStore;