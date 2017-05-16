import '../app.tag';
import Router     from '../router.js';

class StartupStore{

  constructor(){
    var self = this;
    self.name = 'StartupStore';
    self.namespace = self.name+':';
    riot.EVT.startupStore ={
        in:{
          allComponentsLoadComplete:riot.EVT.componentLoaderStore.out.allComponentsLoadComplete
        },
        out:{
          routeCatchallReset:riot.EVT.routeStore.in.routeCatchallReset
        }
    }

    self._startupComplete = false;
    riot.observable(self);
    self.bindEvents();
  }

  bindEvents(){
    var self = this;
    self.on(riot.EVT.startupStore.in.allComponentsLoadComplete, () => {
      console.log(self.name,riot.EVT.startupStore.in.allComponentsLoadComplete);
      if(self._startupComplete == false){
        self._startupComplete = true;
        riot.mount('app');
        riot.router = new Router();
        riot.route.start(true);
      }
      riot.control.trigger(riot.EVT.startupStore.out.routeCatchallReset);
    });
  }
}
export default StartupStore;