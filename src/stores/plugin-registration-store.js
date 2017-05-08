class PluginRegistrationStore{

  constructor(){
    riot.observable(this);
    this.items = [];
    this._registeredPlugins = [];
    this.bindEvents();
  }
  bindEvents(){
    this.on('plugin-registration', this._registerPlugin);
    this.on('plugin-unregistration', this._unregisterPlugin);
  }
  _isRegistered(registrationName){
    var found = false;
    var arr = this._registeredPlugins;
    for(var i=0; i<arr.length; i++) {
        if (arr[i].name === registrationName) {
          found = true;
          break;
        }
    }
    return found;
  }
  _unregisterPlugin(registration){
    var found = this._isRegistered(registrationName);
    if(found === false){
      this.trigger('plugin-unregistration-ack', 
        {
          state:false,
          registration:{
            name:registrationName
          },
          error:'plugin already registered!'
        });
      }else{
        
      }
  }

  _registerPlugin(registration){
    var found = this._isRegistered(registration.name);
   
    if(found === false){
      this._registeredPlugins.push(registration);
      for(var i=0; i<registration.views.length; i++) {
        riot.control.trigger('riot-route-add-view',registration.views[i].view);
      }
      for(var i=0; i<registration.stores.length; i++) {
        registration.stores[i].name = registration.name + '_store_' + i; // need this for my own tracking
        riot.control.trigger('riot-contol-add-store',registration.stores[i].name,registration.stores[i].store);
      }
      for(var i=0; i<registration.postLoadEvents.length; i++) {
        riot.control.trigger(registration.postLoadEvents[i].event,registration.postLoadEvents[i].data);
      }
      this.trigger('plugin-registration-ack', {state:true,registration:registration});
    }else{
      this.trigger('plugin-registration-ack', {state:false,registration:registration,error:'plugin already registered!'});
    }
  }
}
export default PluginRegistrationStore;