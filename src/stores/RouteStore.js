class RouteStore{

  constructor(){
    var self = this;
    self.name = "RouteStore";
    self.namespace = self.name+':';
    riot.EVT.routeStore ={
        in:{
          routeCatchallReset:'route-catchall-reset',
          routeDispatch:'riot-route-dispatch'
        },
        out:{
          riotRouteDispatchAck:'riot-route-dispatch-ack'
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
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch,riot.state.route.defaultRoute);
      }) 
    });

    

    self.on(riot.EVT.routeStore.in.routeDispatch, (route) => {
      console.log(self.name,riot.EVT.routeStore.in.routeDispatch,route)
      riot.route(route)
      self.trigger(riot.EVT.routeStore.in.routeDispatchAck, route);
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