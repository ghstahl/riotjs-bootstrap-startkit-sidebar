class RouteStore{

  constructor(){
    var self = this;
    self.name = "RouteStore";
    self.namespace = self.name+':';
    riot.EVT.routeStore ={
        in:{
          routeCatchallReset:self.namespace+'route-catchall-reset'
        },
        out:{
          
        }
    }

    riot.observable(self);
    self.bindEvents();
  
  }

 
  bindEvents(){
    var self = this;

    self.on(riot.EVT.contributeCatchAllRoute, (r) => {
      console.log(self.name,riot.EVT.contributeRoutes,r)
     r( ()=>{
        console.log('route handler of /  ' )
        riot.control.trigger(riot.EVT.routeDispatch,riot.state.route.defaultRoute);
      }) 
    });

    

    self.on(riot.EVT.routeDispatch, (route) => {
      console.log(self.name,riot.EVT.routeDispatch,route)
      riot.route(route)
      self.trigger(riot.EVT.routeDispatchAck, route);
    });

    self.on(riot.EVT.routeStore.in.routeCatchallReset, () => {
      console.log(self.name,riot.EVT.routeStore.in.routeCatchallReset)
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