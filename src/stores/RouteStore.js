class RouteStore{

  constructor(){
    riot.observable(this);
    this.bindEvents();
  }

  bindEvents(){
    this.on('riot-route-dispatch', (route) => {
      console.log('riot-route-dispatch',route)
      riot.route(route)
      this.trigger('riot-route-dispatch-ack', route);
    });
    
    this.on('riot-route-add-view', (view) => {
      console.log('riot-route-add-view',view)
      riot.router.addView(view)
    });

    this.on('riot-route-remove-view', (view) => {
      console.log('riot-route-remove-view',view)
      riot.router.removeView(view)
    });
  }
}
export default RouteStore;